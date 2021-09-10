import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public serviceLogin: AuthService) { }

  ngOnInit(): void {
  }

  async login(user:string, pass: string){
    
    try{
      this.serviceLogin.Login(user, pass);
    }catch(e:any){
      alert(e.message);
    }
  }


}
