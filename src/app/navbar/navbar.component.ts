import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor( public auth: AuthService ) {}

  logout() {
    this.auth.logout();
  }

}
