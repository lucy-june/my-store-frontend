import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: Product[] = [];
  totalPrice: number = 0;
  userId: string;
  token: string;
  cartId: string;
  endpoint: string = `http://${environment.host}:${environment.port}`;


  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('user_id') as string;
    this.token = localStorage.getItem('id_token') as string;
    this.cartId = localStorage.getItem('cart_id') as string;
  }

  addToCart(product: Product) {
    // window.alert("cartService-product:" + JSON.stringify(product));
    // window.alert("items:" + JSON.stringify(this.items));
    if (this.cartId === null) {
      this.http.post(this.endpoint + '/carts', {token: this.token, userId: this.userId}).subscribe(
        (res: any) => {
          console.log("create new cart successful!" + JSON.stringify(res));
          console.log("create new cart successful!" + res.cart_id);
          localStorage.setItem('cart_id', res.cart_id);
          this.cartId = res.cart_id;
        },
        err => {
          console.log("create new cart err!"  + err);
        }
      )
    } else if (this.cartId !== null) {
      this.http.post(this.endpoint + `/carts/${this.cartId}/products`, {productId: product.id, quantity: product.quantity}).subscribe(
        (res: any) => {
          console.log("add product successfully!" + JSON.stringify(res));
          this.getItems();
        },
        err => {
          console.log("create new cart err!"  + err);
        }
      )
    }
      // let found = false;
      // for (let i = 0; i < this.items.length; i++) {
      //   if (this.items[i].id === product.id) {
      //     found = true;
      //     let preQty = this.items[i].quantity as number;
      //     this.items[i].quantity = preQty + (product.quantity as number);
      //   }
      // }
      // if (!found) {
      //   this.items.push(product);
      // }
  }

  getRequest(): Observable<(Product | any)[]> {
    console.log("this.userId: " + this.userId , "this.cartId:" + this.cartId)
    return this.http.get<any>(this.endpoint + `/users/${this.userId}/cart/${this.cartId}/products`);
  }

  getItems(): Product[] {
    this.getRequest().subscribe((res: {product_id: number; product_name: string; product_price: number; product_img: string; quantity: number}[]) => {
      console.log("items" + JSON.stringify(res));
      let newArr = res.map((obj: {product_id: number; product_name: string; product_price: number; product_img: string; quantity: number}) => {
        let product = new Product();
        product.id = obj.product_id;
        product.name = obj.product_name;
        product.price = obj.product_price;
        product.url = obj.product_img;
        product.quantity = obj.quantity;
        return product;
      });
      this.items = newArr;
    });
    alert("this items: " + this.items);
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  deleteItem(product: Product) {
    this.items = this.items.filter(p => p.id !== product.id);
  }

  getTotalPrice():number {
    this.totalPrice = 0;
    for (let item of this.items) {
      this.totalPrice += item.price * (item.quantity as number);
    }
    return parseFloat(this.totalPrice.toFixed(2));
  }


}
