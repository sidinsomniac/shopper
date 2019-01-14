import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  public collapsed:boolean = true;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor( private afAuth: AngularFireAuth ) {}

  logout() {
    this.afAuth.auth.signOut();
  }

}
