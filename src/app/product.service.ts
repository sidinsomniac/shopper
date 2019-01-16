import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getProduct(id) {
    return this.db.object('/products/'+id).valueChanges();
  }
  
  updateProduct(productId, product) {
    return this.db.object('/products/'+productId).update(product);
  }



}
