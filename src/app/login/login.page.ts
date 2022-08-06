import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private auth: Auth, public navigation : NavigationService) {}

  ngOnInit() {
    //aqui poner un guard si esta logged que entre en el chat directo
    this.logout();
  }

  async logout() {
    await signOut(this.auth);
  }

 
}
