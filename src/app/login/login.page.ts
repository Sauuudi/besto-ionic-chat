import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { initializeApp  } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}

  auth: any;
  name: string = '';
  steps: number;

  firebaseConfig = {
    apiKey: 'AIzaSyDI33E_BE5SmNW2L0b0D3guMdRkORawto0',
    authDomain: 'besto-ionic-chat.firebaseapp.com',
    projectId: 'besto-ionic-chat',
    storageBucket: 'besto-ionic-chat.appspot.com',
    messagingSenderId: '637992742621',
    appId: '1:637992742621:web:f0ee616504e6a1f90ff534',
  };

  ngOnInit() {
    
    
    const app = initializeApp(this.firebaseConfig);
    this.steps=  0;
    this.auth = getAuth();
    this.logout()

  }

  login() {
    console.log("logged in :" + this.auth.currentUser != null);
    
    if (this.auth.currentUser != null) {
    } else {
      signInAnonymously(this.auth)
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

        return true;
        // ...
      } else {
        // User is signed out
        // ...
        console.log('user is signed out');
      }
    });
    return false;
  }

  logout() {
    signOut(this.auth);
  }

  async setUserName(){
    
    if(this.name.length < 5){}
    else{
      
      await this.login()

      await updateProfile(this.auth.currentUser, {
        displayName: this.name
      }).then(() => {
        // Profile updated!
        // ...        
        this.steps++; //en vez de steps que te lleve a 
      }).catch((error) => {
        // An error occurred
        // ...
      });
    } 

  }
  stepBack() : void{
    if(this.steps > 0 ){
      this.steps--;
    }
    else{
      this.router.navigate([".."])
    }
  }
}
