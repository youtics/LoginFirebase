import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

import firebase from '@firebase/app-compat';

declare global{
  interface Window{
    recaptchaVerifier: firebase.default.auth.RecaptchaVerifier;
    confirmationResult: any;
    grecaptcha: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { 
    auth.authState.subscribe(user=> 
      {console.log(user);}
      )
  }
  /** AUTENTICACION CON CUALQUIER CORREO ELECTRONICO */
  Login(user: string, pass: string)
  {
    return this.auth.signInWithEmailAndPassword(user, pass);
  }

  LogOut()
  {
    return this.auth.signOut();
  }

  /** REGISTRAR USUARIO */
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

  /** AUTENTICACIÓN CON GOOGLE */

  googleAuth(){
    /**Esta funcion recibe como parametro un proveedor de correo */
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  googleAuthConRedireccion(){
    /**Esta funcion recibe como parametro un proveedor de correo */
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  /** AUTENTICACION CON  TELEFONO MOVIL Y ENVIO DE CODIGO*/

  enviarCodigo(numeroMovil: string, appVerified:any)
  {
    return this.auth.signInWithPhoneNumber(numeroMovil, appVerified).then(
      confirmacion => {
        window.confirmationResult = confirmacion;
        alert('LISTO');
      }).catch(error=>{
        console.log(error);
      });
  }

  verificarCodigo(codigo: string)
  {
    return window.confirmationResult.confirm(codigo).then((result:any)=>{
      let credenciales = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, codigo);
      this.auth.signInWithCredential(credenciales);
    });
  }


}
