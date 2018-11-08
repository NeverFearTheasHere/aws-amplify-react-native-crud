import graphql from 'graphql-tag';

export default graphql`
  mutation createRecipe(
    $name: String!
    $ingredients: [String]!
    $directions: [String]!
  ) {
    createRecipe(
      input: { name: $name, ingredients: $ingredients, directions: $directions }
    ) {
      id
      name
      ingredients
      directions
    }
  }
`;
