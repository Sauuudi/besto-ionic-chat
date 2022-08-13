import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getDocs, onSnapshot } from '@angular/fire/firestore';
import { signOut } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';
import { Observable, timer } from 'rxjs';
import { ChatService, Message } from '../services/chat.service';
import { NavigationService } from '../services/navigation.service';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  room: any = '1';
  messageToSend: string = '';
  messagesToShow: any[] = [];
  userUid;
  firstTime = true;

  constructor(private cs: ChatService, public navigation: NavigationService) {}

  async ngOnInit() {
    const user = this.cs.getCurrentUser();
    this.userUid = user.uid;
    if (user != null) {
      console.log(
        'hello to chat, name: ' + user.displayName + ' uid: ' + user.uid
      );
    }

    const roomMessages = this.cs.getRoomChatMessages(this.room);

    const unsubscribe = onSnapshot(roomMessages, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added' && change.doc.data().createdAt != null) {
          //console.log('New messages: ', change.doc.data());
          this.messagesToShow.push(change.doc.data());
        }
        if (change.type === 'modified') {
          //console.log('New messages: ', change.doc.data());
          this.messagesToShow.push(change.doc.data());
        }
        this.messagesToShow.sort((msg1, msg2) => {
          if (msg1.createdAt > msg2.createdAt) {
            return 1;
          } else if (msg1.createdAt < msg2.createdAt) {
            return -1;
          } else {
          }
        });
      });
    });
  }

  async logout() {
    await this.cs
      .logout()
      .then(() => {
        // Sign-out successful.
        this.navigation.goHome();
      })
      .catch((error) => {
        // An error happened.
      });
  }

  sendMessage() {
    if (this.messageToSend != '') {
      this.cs
        .addMessageToRoomChat(this.room, this.messageToSend)
        .then((result) => {
          this.messageToSend = '';
          const numbers = timer(400);
          numbers.subscribe(() => this.content.scrollToBottom());
        });
    }
  }
}
