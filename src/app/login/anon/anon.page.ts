import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-anon',
  templateUrl: './anon.page.html',
  styleUrls: ['./anon.page.scss'],
})
export class AnonPage implements OnInit {
  constructor(private auth: Auth, public navigation : NavigationService) {}
  name: string = '';
  showAccessButton : boolean;

  ngOnInit() {
    this.showAccessButton = false;
    this.login()
  }

  async login() {

    if (this.auth.currentUser != null) {
    } else {
      await signInAnonymously(this.auth)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }

  getUser() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('user is signed in, uid: ' + uid);
        console.log('name: ' + user.displayName);
        // ...
      } else {
        // User is signed out
        // ...
        console.log('user is signed out');
      }
    });
  }

   setUserName() {
    
    if (this.name.length < 5) {
    } else {
       updateProfile(this.auth.currentUser, {
        displayName: this.name,
      })
        .then(() => {
          // Profile updated!
          // ...
        this.showAccessButton = true;

        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    }
  }
}
