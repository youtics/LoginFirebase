import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

import firebase from '@firebase/app-compat';

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

  Registrar(user: string, pass: string)
  {
    return this.auth.createUserWithEmailAndPassword(user, pass);
  }

  VerificarCorreo()
  {
    this.auth.currentUser.then(
      user=>{
        if(user!=null)
        {
          user.sendEmailVerification();
        }
      }
    )
  }

  googleAuth(){
    /**Esta funcion recibe como parametro un proveedor de correo */
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }


}
