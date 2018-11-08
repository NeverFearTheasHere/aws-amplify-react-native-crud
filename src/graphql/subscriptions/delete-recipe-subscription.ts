import graphql from 'graphql-tag';

export default graphql`
  subscription onDeleteRecipe {
    onDeleteRecipe {
      id
      name
      ingredients
      directions
    }
  }
`;
