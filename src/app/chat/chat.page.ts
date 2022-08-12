import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';
import { Observable } from 'rxjs';
import { ChatService, Message } from '../services/chat.service';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  room: any = '1';
  messageToSend: string = '';
  

  constructor(private cs: ChatService, public navigation: NavigationService) {}

  async ngOnInit() {
    const user = this.cs.getCurrentUser();
    if (user != null) {
      console.log(
        'hello to chat, name: ' + user.displayName + ' uid: ' + user.uid
      );
    }

    //this.messages = this.cs.getRoomChatMessages(this.room)
    
    
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
      this.cs.addMessageToRoomChat(this.room, this.messageToSend);
    }
  }
}
