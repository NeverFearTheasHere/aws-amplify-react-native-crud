export type Id = string;

export type CreateRecipe = {
  name: string;
  ingredients: Array<string>;
  directions: Array<string>;
};

export type Recipe = {
  id: Id;
  name: string;
  ingredients: Array<string>;
  directions: Array<string>;
};
