import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(private auth: Auth) {}

  async ngOnInit() {
    if (this.auth.currentUser != null) {
      console.log("already signed in: " + this.auth.currentUser.uid);
      
    } 
    else {
     await signInAnonymously(this.auth)
        .then((userCredential) => {
          // Signed in
          console.log("signed in: " + this.auth.currentUser.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

  }

  async logout() {
    await signOut(this.auth).then(() => {
      // Sign-out successful.
      console.log("signed out");
      
    }).catch((error) => {
      // An error happened.
    });;
  }
}
