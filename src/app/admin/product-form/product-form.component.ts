import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public categories$;
  public product = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
    ) {
    this.categories$ = categoryService.getCategories();
    let id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.productService.getProductId(id).pipe(
        take(1)
      ).subscribe( data => {
        this.product = data;
      })
    }
  }
  
  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
