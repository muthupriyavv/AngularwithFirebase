import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import {Recipe} from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  //@Input() recipe : {name: string,description:string,imagePath:string} This is correct
  @Input() recipe : Recipe ;
  @Input() index : number;
  // @Output() recipeSelected = new EventEmitter<void>(); using service for component communication
  // constructor(private recipeservice : RecipeService) { }   //using router
  
  /**********Removed since we use router***********/
  /*
  onSelected(){
    // this.recipeSelected.emit(); service for component communication
    this.recipeservice.recipeSelected.emit(this.recipe);
    
  }*/

  ngOnInit(): void {
  }

}
