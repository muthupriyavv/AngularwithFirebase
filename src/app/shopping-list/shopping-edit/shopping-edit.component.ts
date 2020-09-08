import { Component, OnInit , EventEmitter, Output, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit , OnDestroy{

  // @ViewChild('nameInput',{static : true}) nameInputRef : ElementRef;
  // @ViewChild('amountInput',{static : true}) amountInputRef : ElementRef;
  
  // @Output() ingredientAdded   = new EventEmitter<Ingredient>();
  @ViewChild('f',{static : false}) slform : NgForm;
  subscription : Subscription
  editMode = false 
  editedItemIndex : number;
  editedItem : Ingredient;
  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit(): void {
   this.subscription = this.shoppinglistservice.startedEditing.subscribe(
     (index : number) => {
      this.editedItemIndex = index ;
      this.editMode = true;
      this.editedItem = this.shoppinglistservice.getIngredient(index);
      this.slform.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      })
     }
   );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(form : NgForm){
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value
    // const ingAmount = this.amountInputRef.nativeElement.value
    const newIngredient = new Ingredient(value.name,value.amount)
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode)
    {
      this.shoppinglistservice.updateIngredient(this.editedItemIndex,newIngredient)
    }
    else{
    this.shoppinglistservice.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppinglistservice.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

}
