import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public serviceLogin: AuthService) { }

  ngOnInit(): void {
    /** HAY QUE DARLE TIEMPO PARA QUE NO LANCE UN ERROR */
    setTimeout(() => {
      this.captchaCrear();
    }, 800);
   
  }

  async login(user:string, pass: string){
    
    try{
      this.serviceLogin.Login(user, pass);
    }catch(e:any){
      alert(e.message);
    }
  }
  async Registrar(user:string, pass: string){
    
    try{
      this.serviceLogin.Registrar(user, pass);
    }catch(e:any){
      alert(e.message);
    }
  }
  /** creo el recaptcha */
  captchaCrear()
  {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recapcha-container');
    window.recaptchaVerifier.render();
  }

  enviarCaptcha(numeroMovil: string)
  {
    this.serviceLogin.enviarCodigo(numeroMovil, window.recaptchaVerifier);
  }

}
