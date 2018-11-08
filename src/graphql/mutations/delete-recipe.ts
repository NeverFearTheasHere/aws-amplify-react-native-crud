import graphql from 'graphql-tag';

export default graphql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(input: { id: $id }) {
      id
      name
      ingredients
      directions
    }
  }
`;
