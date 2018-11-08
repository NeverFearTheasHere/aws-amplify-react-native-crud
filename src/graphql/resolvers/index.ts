import { graphql } from 'react-apollo';
import ListRecipes from '../queries/list-recipes';
import CreateRecipe from '../mutations/create-recipe';
import DeleteRecipe from '../mutations/delete-recipe';
import NewRecipeSubscription from '../subscriptions/new-recipe-subscription';
import DeleteRecipeSubscription from '../subscriptions/delete-recipe-subscription';

type Props = any;
type GraphQLData = any;
export const listRecipeGQLAction = graphql<Props, GraphQLData, any, any>(
  ListRecipes,
  {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
      subscribeToNewRecipes: params => {
        props.data.subscribeToMore({
          document: NewRecipeSubscription,
          updateQuery: (
            prev,
            {
              subscriptionData: {
                data: { onCreateRecipe },
              },
            }
          ) => ({
            ...prev,
            listRecipes: {
              __typename: 'RecipeConnection',
              items: [
                onCreateRecipe,
                ...prev.listRecipes.items.filter(
                  recipe => recipe.id !== onCreateRecipe.id
                ),
              ],
            },
          }),
        });
      },
      subscribeToDeletedRecipes: params => {
        props.data.subscribeToMore({
          document: DeleteRecipeSubscription,
          updateQuery: (
            prev,
            {
              subscriptionData: {
                data: { onDeleteRecipe },
              },
            }
          ) => ({
            ...prev,
            listRecipes: {
              __typename: 'RecipeConnection',
              items: [
                ...prev.listRecipes.items.filter(
                  recipe => recipe.id !== onDeleteRecipe.id
                ),
              ],
            },
          }),
        });
      },
    }),
  }
);

export const createRecipeGQLAction = graphql<any, any, any, any>(CreateRecipe, {
  props: props => ({
    onAdd: recipe => {
      props.mutate({
        variables: recipe,
        optimisticResponse: {
          __typename: 'Mutation',
          // TODO - should be creating id client-side instead of using recipe name
          createRecipe: {
            ...recipe,
            id: recipe.name,
            __typename: 'Recipe',
          },
        },
        update: (proxy, { data: { createRecipe } }) => {
          const data = proxy.readQuery<{ listRecipes: any }>({
            query: ListRecipes,
          });
          // TODO - should be creating id client-side instead of using recipe name
          data.listRecipes.items.push({
            ...createRecipe,
            id: createRecipe.name,
          });
          proxy.writeQuery({ query: ListRecipes, data });
        },
      });
    },
  }),
});

export const deleteRecipeAction = graphql(DeleteRecipe, {
  props: props => ({
    deleteRecipeById: id => {
      props.mutate({
        variables: { id: id },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteRecipe: { id, __typename: 'ID' },
        },
        update: (proxy, { data: { deleteRecipe } }) => {
          const data = proxy.readQuery({ query: ListRecipes });
          let idExists = false;

          if (!idExists) {
            data.listRecipes.items.reduce((items, recipe) => {
              if (recipe.id === deleteRecipe.id) {
                idExists = recipe.id === deleteRecipe.id;
                return items;
              } else {
                return [...items, recipe];
              }
            }, []);
          } else {
            proxy.writeQuery({
              query: DeleteRecipe,
              id,
              __typename: deleteRecipe.__typename,
            });
          }
        },
      });
    },
  }),
});
