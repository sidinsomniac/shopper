import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  public products$;
  public productkey = [];
  public subscriber: Subscription;

  constructor(private productService: ProductService) {
    this.products$ = productService.getAllProducts().valueChanges();
    this.subscriber = productService.getAllProducts().snapshotChanges().subscribe(
      data => this.productkey = data
    );
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
