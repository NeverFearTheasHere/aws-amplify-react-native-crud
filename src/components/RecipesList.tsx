import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Recipe, Id } from '../models/recipe';

type Props = {
  recipes: Array<Recipe>;
  deleteRecipeById: (id: Id) => void;
};

const RecipeOverview = (props: Props) => {
  const { recipes } = props;
  return recipes.length === 0 ? (
    <View style={styles.recipeContainer}>
      <Text style={styles.itemText}>You have no recipes yet</Text>
    </View>
  ) : (
    <View style={styles.recipeContainer}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item: recipe }) => (
          <View style={styles.recipeContainer}>
            <View style={styles.singleLine}>
              <TouchableOpacity>
                <Text
                  onPress={() => props.deleteRecipeById(recipe.id)}
                  aria-label="Logo"
                >
                  ❌
                </Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>{recipe.name}</Text>
            </View>
            <Text style={styles.subHeaderText}>Ingredients:</Text>
            {recipe.ingredients.map((ing, index) => (
              <Text style={styles.itemText} key={index}>
                {ing}
              </Text>
            ))}
            <Text style={styles.subHeaderText}>Directions:</Text>
            {recipe.directions.map((dir, index) => (
              <Text style={styles.itemText} key={index}>
                {dir}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    paddingBottom: 10,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 22,
    marginLeft: 5,
  },
  subHeaderText: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  itemText: {
    fontSize: 14,
    marginLeft: 20,
  },
  singleLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default RecipeOverview;
