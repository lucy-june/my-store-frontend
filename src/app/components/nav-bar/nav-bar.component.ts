import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userName: string;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
    ) {
    this.userName = "Log in"
   }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') as string;
  }

  logout() {
    this.authService.logOut();
    window.location.reload();
  }

  loadingCart() {
    this.cartService.getItems();
    // this.router.navigateByUrl('/cart').then(() => {
    //   window.location.reload();
    // })
  }


}
