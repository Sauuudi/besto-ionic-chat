import { Component, Input, OnInit } from '@angular/core';
import { getDocs, onSnapshot } from '@angular/fire/firestore';
import { ChatService, Message } from '../../services/chat.service';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  room: any;
  messageToSend = '';
  messagesToShow = [];
  userUid;

  constructor(private cs: ChatService, private route : Router, private hs : HeaderService) {}

  async ngOnInit() {

    this.hs.setHref('rooms')
    this.room = this.route.url.slice(-3).replace(/\D/g, '');
    this.hs.setTitle('room - ' + this.room )
    const user = this.cs.getCurrentUser();
    this.userUid = user.uid;
    if (user != null) {
      console.log(
        'hello to chat, name: ' + user.displayName + ' uid: ' + user.uid
      );
    }

    const roomMessages = this.cs.getRoomChatMessages(this.room);

    const messagesObs = onSnapshot(roomMessages, (querySnapshot) => {
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

  sendMessage() {
    if (this.messageToSend != '') {
      this.cs.addMessageToRoomChat(this.room, this.messageToSend).then(() => {
        this.messageToSend = '';
      });
    }
  }
}
