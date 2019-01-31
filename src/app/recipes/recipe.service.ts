import { Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../_shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A test resipe', 'This is a simple test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chocolate-fudge-cake.jpg',
      [new Ingredient('Meat', 1),
      new Ingredient('Apple', 4)]),
    new Recipe('A test resipe 2', 'This is a simple test 2!',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chocolate-fudge-cake.jpg',
      [new Ingredient('Onion', 2),
      new Ingredient('Orange', 5)])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addREcipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteREcipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
