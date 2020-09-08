import {Component,EventEmitter, Output, OnInit, OnDestroy} from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})

export class HeaderComponent implements OnInit , OnDestroy {
    // @Output() featureSelected = new EventEmitter<string>();


    // onSelect(feature : string) {
    //     this.featureSelected.emit(feature)
    // }
    isAuthenticated = false;
    private userSub : Subscription;
    ngOnInit(){
       this.userSub =  this.authService.user.subscribe(user => {
           console.log("header",user)
           this.isAuthenticated = !user ? false : true;   // !!user
           console.log("aaa",this.isAuthenticated);
       });
    }

    constructor(private datastorageservice : DataStorageService , private authService : AuthService){

    }

    onSaveData(){
       this.datastorageservice.storeRecipes();
    }

    onFetchData(){
       this.datastorageservice.fetchRecipes().subscribe();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onLogout(){
        this.authService.logout()
    }

}