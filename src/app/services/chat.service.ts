import { Injectable } from '@angular/core';
import {
  Auth,
  signOut,
  signInAnonymously,
  updateProfile,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { FieldValue, Firestore } from '@angular/fire/firestore';

export interface User {
  uid: string;
  name: string;
}

export interface Message {
  id: string;
  from: string;
  fromName: string;
  msg: string;
  myMsg: boolean;
  createdAt: FieldValue;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private auth: Auth, private store: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('user is signed in, uid: ' + user.uid);
        console.log('name: ' + user.displayName);
        // ...
      } else {
        // User is signed out
        // ...
        console.log('user is signed out');
      }
    });
  }

  async login() {
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

  logout() {
    return signOut(this.auth);
  }

  setUserName(name: string) {
    if (name.length < 5) {
    } else {
      updateProfile(this.auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    }
  }
}
