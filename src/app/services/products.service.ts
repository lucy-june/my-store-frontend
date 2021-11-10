import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  endpoint: string = `http://${environment.host}:${environment.port}`;

  constructor(private http: HttpClient) {
    this.products = [];
  }

  getRequest(): Observable<(Product | any)[]> {
    return this.http.get<Product[]>(this.endpoint + "/products");
  }

  // getProductById(productId: number): Product {
  //   return this.products.find(p => p.id === productId) as Product;
  // }

  getProducts(): Product[] {
    this.getRequest().subscribe((res: {product_id: number; product_name: string; product_price: number; product_img: string}[]) => {
      let newArr = res.map((obj: {product_id: number; product_name: string; product_price: number; product_img: string}) => {
        let product = new Product();
        product.id = obj.product_id;
        product.name = obj.product_name;
        product.price = obj.product_price;
        product.url = obj.product_img;
        return product;
      });
      this.products = newArr;
    });
    return this.products;
  }

  getProductById (productId: number): Product {
    return {
      "id": 2,
      "name": "Headphones",
      "price": 249.99,
      "url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "description": "Listen to stuff!"
    }
  }

  getProduct5() {
    return {
      "id": 5,
      "name": "Cup",
      "price": 4.99,
      "url": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "description": "Drink anything with it!"
    }
  }
}
