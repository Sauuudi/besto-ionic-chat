import { Injectable } from '@angular/core';
import {
  Auth,
  signOut,
  signInAnonymously,
  updateProfile,
  onAuthStateChanged,
} from '@angular/fire/auth';
import {
  FieldValue,
  doc,
  setDoc,
  Firestore,
  onSnapshot,
  collection,
  deleteDoc,
  serverTimestamp,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  constructor(public auth: Auth, public store: Firestore) {
    //this.authObserver();
    //this.dbUsersObserver();
    //this.getDbUsers();
    //this.getRoomChatMessages("1");
  }

  async login() {
    await signInAnonymously(this.auth)
      .then((userCredential) => {
        // Signed in
        console.log('logged in, uid: ' + userCredential.user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  logout() {
    var uid = this.auth.currentUser.uid;
    return signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        this.deleteUserInStore(uid);
        console.log('signed out');
      })
      .catch((error) => {
        // An error happened.
        console.log('error while signing out: ' + error);
      });
  }

  async loginAnonWithName(name: string) {
    if (name.length < 5) {
    } else {
      await this.login();
      await updateProfile(this.auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          // Profile updated!
          // ...
          this.saveUserInStore(name, this.auth.currentUser.uid);
          console.log('updated name: ' + this.auth.currentUser.displayName);
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log('error while updating name: ' + error);
        });
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  authObserver() {
    const unsub = onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('(state observer) user : ' + user.uid);
        // ...
      } else {
        // User is signed out
        // ...
        console.log(' (state observer) user is signed out');
      }
    });
  }

  async saveUserInStore(name, uid) {
    await setDoc(doc(this.store, 'users', uid), {
      displayName: name,
      uid: uid,
    })
      .then(() => {
        console.log('saved user ' + uid + ' in db');
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log('error while saving user in db: ' + error);
      });
  }
  async deleteUserInStore(uid) {
    await deleteDoc(doc(this.store, 'users', uid))
      .then(() => {
        console.log('deleted user: ' + uid + ' in db');
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log('error while saving user in db: ' + error);
      });
  }

  async addMessageToRoomChat(room: string, msg: string) {
    var id = (
      await getDocs(collection(this.store, 'rooms/' + room + '/messages'))
    ).size;

    return await setDoc(
      doc(this.store, 'rooms/' + room + '/messages', (id + 1).toString()),
      {
        msg,
        from: this.auth.currentUser.uid,
        fromName: this.auth.currentUser.displayName,
        createdAt: serverTimestamp(),
      }
    );
  }

  getRoomChatMessages(room: string) {
    const q = query(collection(this.store, 'rooms/' + room + '/messages'));
    return q;
  }

  async getDbUsers() {
    let users = [];
    const querySnapshot = await getDocs(collection(this.store, 'users'));
    //  console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      users.push(doc.id + '=>' + doc.data());
    });

    return users;
  }

  dbUsersObserver() {
    const unsub = onSnapshot(collection(this.store, 'users'), (doc) => {
      console.log('Current user collection: ', doc.docs);
    });
    //tal vez mirar changes
  }
}
