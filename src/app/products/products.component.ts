import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy{

  public products$: any = [];
  public categories: any = [];
  public subscriber: Subscription;
  public selectedCategory: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.products$ = productService.getAllProducts().valueChanges();
    this.subscriber = categoryService.getAll().subscribe(
      data => this.categories = data
    );

    route.queryParamMap.subscribe( params => {
      this.selectedCategory = params.get('category');
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe;
  }

}
