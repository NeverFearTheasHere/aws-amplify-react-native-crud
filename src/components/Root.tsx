import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { compose } from 'react-apollo';
import { Auth } from 'aws-amplify';
import * as resolver from '../graphql/resolvers/index';
import RecipesList from './RecipesList';
import { CreateRecipe, Recipe } from '../models/recipe';
import NewRecipeForm from './NewRecipeForm';

type Props = {
  subscribeToNewRecipes: () => void;
  subscribeToDeletedRecipes: () => void;
  onAdd: (recipe: CreateRecipe) => void;
  recipes: Array<Recipe>;
  deleteRecipeById: (id: string) => void;
};

type State = {
  name: string;
  ingredient: string;
  direction: string;
  ingredients: Array<string>;
  directions: Array<string>;
  showNewRecipeForm: boolean;
};

class Root extends React.Component<Props, State> {
  state = {
    name: '',
    ingredient: '',
    direction: '',
    ingredients: [],
    directions: [],
    showNewRecipeForm: false,
  };

  componentDidMount() {
    this.props.subscribeToNewRecipes();
    this.props.subscribeToDeletedRecipes();
  }

  onChange = <K extends keyof State>(key: K, value: State[K]) => {
    this.setState({ [key]: value } as Pick<State, K>);
  };
  addIngredient = () => {
    if (this.state.ingredient === '') return;
    const ingredients = this.state.ingredients;
    ingredients.push(this.state.ingredient);
    this.setState({
      ingredient: '',
    });
  };

  addDirection = () => {
    if (this.state.direction === '') return;
    const directions = this.state.directions;
    directions.push(this.state.direction);
    this.setState({
      direction: '',
    });
  };

  showRecipeForm = () => {
    this.setState({ showNewRecipeForm: true });
  };

  hideRecipeForm = () => {
    this.setState({ showNewRecipeForm: false });
  };

  addRecipe = () => {
    const { name, ingredients, directions } = this.state;
    this.props.onAdd({
      name,
      ingredients,
      directions,
    });
    this.setState({ name: '', directions: [], ingredients: [] });
  };

  handleSignOut = () => {
    Auth.signOut()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign out" onPress={() => this.handleSignOut()}>
          <Text>Sign out</Text>
        </Button>

        {this.state.showNewRecipeForm ? (
          <>
            <NewRecipeForm
              name={this.state.name}
              ingredient={this.state.ingredient}
              direction={this.state.direction}
              ingredients={this.state.ingredients}
              directions={this.state.directions}
              onChange={this.onChange}
              addIngredient={this.addIngredient}
              addDirection={this.addDirection}
              addRecipe={(...args) => {
                this.addRecipe(...args);
                this.hideRecipeForm();
              }}
            />
            <Button title="Cancel" onPress={this.hideRecipeForm}>
              <Text>Cancel</Text>
            </Button>
          </>
        ) : (
          <>
            <RecipesList
              recipes={this.props.recipes}
              deleteRecipeById={this.props.deleteRecipeById}
            />
            <Button title="new recipe" onPress={this.showRecipeForm}>
              <Text>Add a new recipe</Text>
            </Button>
          </>
        )}
      </View>
    );
  }
}

export default compose(
  resolver.listRecipeGQLAction,
  resolver.createRecipeGQLAction,
  resolver.deleteRecipeAction
)(Root);

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
