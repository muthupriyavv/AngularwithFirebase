import { Component, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy {
  /* removed since communication bt components
  @Output() recipeWasSelected = new EventEmitter<Recipe>(); */

 /*Moved to Recipe Service 
  recipes: Recipe[] = [
    new Recipe('A Test Recipe','Sample recipe1','https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg'),
    new Recipe('B Test Recipe','Sample recipe2','https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg'
    )] */

  recipes: Recipe[] ;
  subscription : Subscription;

  /* removed since communication bt components using services
  onRecipeSelected(recipe: Recipe){
   this.recipeWasSelected.emit(recipe);
  }*/

  constructor(private recipeservice : RecipeService,private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription =  this.recipeservice.recipesChanged.subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeservice.getRecipes();
  }

  onNewRecipe(){
         this.router.navigate(['new'],{relativeTo : this.route })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
