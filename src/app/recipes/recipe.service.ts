import { Recipe } from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    // recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe','Sample recipe1','https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg'
    //     ,[new Ingredient('meat',1),
    //       new Ingredient('french fries',4)]),
    //     new Recipe('B Test Recipe','Sample recipe2','https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg'
    //     ,[new Ingredient('Bread',2),
    //     new Ingredient('Meat',1)]
    //     )]
    private recipes : Recipe[] = []
    constructor(private shoppinglistservice : ShoppingListService){

    }

    getRecipes(){
        return this.recipes.slice(); //slice return the new array which is the exact copy of the old array
    }

    getRecipe(index : number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients : Ingredient[]){
       this.shoppinglistservice.addIngredients(ingredients);
    }

    addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index : number , newRecipe : Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice())
    }
    
    deleteRecipe(index : number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.recipes.slice())
    }

    setRecipes(recipes : Recipe[]){
      this.recipes = recipes
      this.recipesChanged.next(this.recipes.slice())
    }
}