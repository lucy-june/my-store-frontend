import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';


const routes: Routes = [
  { path: '' , component: ProductListComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'cart', component: CartComponent},
  { path: 'cart/check-out', component: CheckOutComponent},
  { path: 'products/:id', component: ProductItemDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
