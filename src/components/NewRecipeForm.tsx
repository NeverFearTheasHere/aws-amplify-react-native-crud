import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

type Props = {
  name: string;
  direction: string;
  addDirection: () => void;
  directions: Array<string>;
  ingredient: string;
  addIngredient: () => void;
  ingredients: Array<string>;
  onChange: (key: string, value: string) => void;
  addRecipe: () => void;
};

const AddRecipe = (props: Props) => (
  <View style={styles.addRecipeContainer}>
    <View>
      <Text style={styles.headerText}>Add a recipe</Text>
      <TextInput
        placeholder="Recipe name"
        value={props.name}
        onChangeText={value => props.onChange('name', value)}
      />
      <TextInput
        placeholder="Ingredient name"
        value={props.ingredient}
        onChangeText={value => props.onChange('ingredient', value)}
      />
      <Button
        style={styles.smallButton}
        title="Add this ingredient"
        onPress={props.addIngredient}
      />
      <TextInput
        placeholder="Direction name"
        value={props.direction}
        onChangeText={value => props.onChange('direction', value)}
      />
      <Button title="Add this direction" onPress={props.addDirection} />
    </View>
    <View>
      <View>
        <Text style={styles.subHeaderText}>Ingredients:</Text>
        {props.ingredients.length === 0 && (
          <Text>
            Once you have added some ingredients above, they will appear here
          </Text>
        )}
        {props.ingredients.map((ingredient, index) => (
          <View key={index}>
            <Text>
              {index + 1}: {ingredient}
            </Text>
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.subHeaderText}>Directions:</Text>
        {props.directions.length === 0 && (
          <Text>
            Once you have added some directions above, they will appear here
          </Text>
        )}
        {props.directions.map((direction, index) => (
          <View key={index}>
            <Text>
              {index + 1}: {direction}
            </Text>
          </View>
        ))}
      </View>

      <Button title="Save" onPress={props.addRecipe} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  addRecipeContainer: {
    padding: 10,
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
  smallButton: {
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});

export default AddRecipe;
