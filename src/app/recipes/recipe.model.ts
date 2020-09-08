import { Ingredient } from '../shared/ingredient.model';

//Model
export class Recipe {
    //blue print objects we create
    public name: string ;
    public description: string;
    public imagePath: string;
    public ingredients : Ingredient[];

    constructor(name: string,desc: string,imagePath: string , ingredients : Ingredient[]){
      this.name = name;
      this.description = desc;
      this.imagePath = imagePath;
      this.ingredients = ingredients;
    }
}