import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  /*Moved to Shopping List service
  ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomato',10),
  ]; */
  
 
  ingredients : Ingredient[];
  private  inChangeSub : Subscription;

  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit() : void {
     this.ingredients = this.shoppinglistservice.getIngredients();
     this.inChangeSub = this.shoppinglistservice.ingredientsChanged.subscribe((ingredients : Ingredient[]) => {
     this.ingredients = ingredients;
     })
  }

  // onIngredientAdded(ingredient : Ingredient){
  //   console.log("ing",ingredient)
  //   this.ingredients.push(ingredient);
  // } 

  ngOnDestroy(){
    this.inChangeSub.unsubscribe();
  }

  onEditItem(index : number){
    this.shoppinglistservice.startedEditing.next(index);

  }

}
