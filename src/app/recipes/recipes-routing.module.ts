import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth-guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';


const routes : Routes = [
    {
        path : '',
        component : RecipesComponent,
        canActivate: [AuthGuard],
        children : [
            {
                path : '',
                component : RecipeStartComponent
            },
            {
                path: 'new',
                component : RecipeEditComponent
            },
            {
                path : ':id',
                component : RecipeDetailComponent,
                resolve : [RecipesResolverService]
            },
           
            {
                path : ':id/edit',
                component : RecipeEditComponent,
                resolve : [RecipesResolverService]
            }
        ]
    }
]

@NgModule({
   imports : [
       RouterModule.forChild(routes)
   ],
   exports : [
       RouterModule
   ]
})
export class RecipesRoutingModule {

}