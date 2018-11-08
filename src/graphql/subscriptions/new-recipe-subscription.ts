import graphql from 'graphql-tag';

export default graphql`
  subscription onCreateRecipe {
    onCreateRecipe {
      id
      name
      ingredients
      directions
    }
  }
`;
