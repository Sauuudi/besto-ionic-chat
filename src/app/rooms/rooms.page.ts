import { Component, OnInit, ViewChild } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ChatService } from '../services/chat.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  newRoomName = '';
  rooms: any[] = [];
  constructor(private cs: ChatService, public navigation: NavigationService) {}

  ngOnInit() {
    this.getRooms();
  }

  async getRooms() {
    this.rooms = [];
    const roomsFS = this.cs.getAllRooms();

    (await roomsFS).forEach((doc) => {
      this.rooms.push(doc.data());
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

  async createRoom() {
    if (this.newRoomName == '' || this.newRoomName.length < 4) {
    } else {
      await this.cs.createNewRoom(this.newRoomName);
      this.getRooms();
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.newRoomName == '' || this.newRoomName.length < 4) {
    } else {
      this.modal.dismiss(this.newRoomName, 'confirm');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
}

/*
querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          //console.log('New messages: ', change.doc.data());
          this.rooms.push(change.doc.data());
        }
        if (change.type === 'modified') {
          //console.log('New messages: ', change.doc.data());
          this.rooms.push(change.doc.data());
        }

      });*/
