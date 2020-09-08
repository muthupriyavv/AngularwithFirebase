import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService , AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent  implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceHolderDirective,{static:false}) alertHost : PlaceHolderDirective;
  private closeSub : Subscription;

  onSwitchMode(){
      this.isLoginMode = !this.isLoginMode;
  }

  constructor(private authservice : AuthService, private router : Router, private componentFactoryResolver : ComponentFactoryResolver){

  }

  onSubmit(form : NgForm)
  {
      if(!form.valid){
          return;
      }
      const email = form.value.email;
      const password = form.value.password;

      let authObs : Observable<AuthResponseData>

      this.isLoading = true;
      if(this.isLoginMode) 
      {
      authObs = this.authservice.login(email,password)
      }
      else
      {
      authObs = this.authservice.signup(email,password)
      }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData)
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        this.isLoading = false;
        console.log(errorMessage)
        this.showErrorAlert(errorMessage);  //for dynamic creation on components
        this.error = errorMessage
       
      }
    )
      form.reset();
  }

  onHandleClose(){
    this.error = null
  }

  private showErrorAlert(message : string) {
  //wont work -->  const alertCmp = new AlertComponent();
  const alertcmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  const hostViewContainerRef  = this.alertHost.viewContainerRef
  hostViewContainerRef.clear();

  const componentRef = hostViewContainerRef.createComponent(alertcmpFactory);
  
  componentRef.instance.message = message;

  this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear()
  })

  }

  ngOnDestroy(){
    if(this.closeSub)
    {
    this.closeSub.unsubscribe()
    }
  }
}