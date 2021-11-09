import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = this.cartService.getItems();
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }


  deleteProduct(product: Product):void {
    // this.cartItems = this.cartItems.filter(p => p.id !== product.id);
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  addProduct(product: Product): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  reduceProduct(product: Product): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }




}
