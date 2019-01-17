import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  public products: any = [];
  public filteredProducts: any = [];
  public categories: any = [];
  public subscriber: Subscription;
  public selectedCategory: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    productService.getAllProducts().valueChanges().pipe(
      switchMap(
        products => {
          this.filteredProducts = this.products = products;
          return route.queryParamMap;
        }
      )).subscribe(params => {
        this.selectedCategory = params.get('category');

        this.filteredProducts = (this.selectedCategory) ?
          this.products.filter(product => product.category === this.selectedCategory) : this.products;
      })

    this.subscriber = categoryService.getAll().subscribe(
      data => this.categories = data
    );
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe;
  }

}
