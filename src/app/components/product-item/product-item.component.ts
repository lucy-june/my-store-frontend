import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity = 1;

  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      quantity: 0,
      description: ''
    }
  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    product.quantity = parseInt(this.selectedQuantity as unknown as string);
    // window.alert("product-item:" + JSON.stringify(product));
    // window.alert("before add to cart: cart contain: ");
    // this.cartService.showCart();
    let newProduct = new Product();
    newProduct.quantity = product.quantity;
    newProduct.id = product.id;
    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.url = product.url;
    newProduct.description = product.description;
    this.cartService.addToCart(newProduct);
    // this.cartService.showCart();
  }

}
