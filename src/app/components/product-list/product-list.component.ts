import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
     this.productsService.getRequest().subscribe(res => {
      let newArr = res.map(obj => {
        let product = new Product();
        product.id = obj.product_id;
        product.name = obj.product_name;
        product.price = obj.product_price;
        product.url = obj.product_img;
        return product;
      });
      this.productList = newArr;
    });
  }
}
