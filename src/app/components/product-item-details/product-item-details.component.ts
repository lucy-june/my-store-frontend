import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.css']
})
export class ProductItemDetailsComponent implements OnInit {
  productId: number;
  product: Product;
  options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity = 1;

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private cartService: CartService) {
    this.productId = 0;
    this.product = new Product();
   }

  ngOnInit(): void {
    this.productId = parseInt(this.route.snapshot.params['id']);
    this.loadProductDetails();
  }

  loadProductDetails() {
    // this.product = this.productService.getProductById(productId) as Product;
    //window.alert(JSON.stringify(productId));
    //window.alert(JSON.stringify(this.product));
    this.productsService.getRequest().subscribe(res => {
      let obj: any = res.find(p => p.product_id === this.productId);
      // window.alert(JSON.stringify(obj));
      // window.alert(JSON.stringify("this.productId" + this.productId));
      // window.alert(JSON.stringify(res));
      let newProduct = new Product();
      newProduct.id = obj.product_id;
      newProduct.name = obj.product_name;
      newProduct.price = obj.product_price;
      newProduct.url = obj.product_img;
      this.product = newProduct;
    });
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
