import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(private auth: Auth, public navigation: NavigationService) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user != null) {
      console.log(
        'in chat already logged in, name: ' +
          user.displayName +
          ' uid: ' +
          user.uid
      );
    }
  }

  async logout() {
    await signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('signed out');
        this.navigation.goHome()
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
