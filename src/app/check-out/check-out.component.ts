import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping = {};
  cartSubscription: Subscription;
  userSubscription: Subscription;
  cart: ShoppingCart;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
    ){}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe( cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  async placeOrder() {

    let order = new Order(this.userId,this.shipping,this.cart);

    order.items.map(item => {
      item.totalPrice = item.product.price * item.quantity;
    })
    let result = await this.orderService.placeOrder(order, this.cart);
    this.router.navigate(['/order-success',result.key])
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
