import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter;
  @Output() addProduct: EventEmitter<Product> = new EventEmitter;
  @Output() reduceProduct: EventEmitter<Product> = new EventEmitter;
  amount: number;

  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    },
    this.amount = 0;
   }

  ngOnInit(): void {
    this.amount = this.product.price * (this.product.quantity as number);
  }

  delete(product: Product): void {
    this.cartService.deleteItem(product);
    this.deleteProduct.emit(product);
    this.getAmount();
  }

  addItemButton(product: Product) {
    (this.product.quantity as number) += 1;
    // this.cartService.showCart();
    this.addProduct.emit(product);
    this.getAmount();
  }

  reduceItemButton(product: Product) {
    if ((this.product.quantity as number) > 0) {
      (this.product.quantity as number) -= 1;
    } else {
      this.product.quantity = 0;
    }
    this.reduceProduct.emit(product);
    this.getAmount();
  }

  getAmount() {
    this.amount = this.product.price * (this.product.quantity as number);
    this.amount = parseFloat(this.amount.toFixed(2));
    return this.amount;
  }
}
