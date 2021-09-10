import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { 
    auth.authState.subscribe(user=> 
      {console.log(user);}
      )
  }

  Login(user: string, pass: string)
  {
    return this.auth.signInWithEmailAndPassword(user, pass);
  }

  LogOut()
  {
    return this.auth.signOut();
  }

}
