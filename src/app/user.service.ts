import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save( user: User) {
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }
}
