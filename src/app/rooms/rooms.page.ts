import { Component, OnInit, ViewChild } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ChatService } from '../services/chat.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  newRoomName = '';
  rooms: any[] = [];
  constructor(
    private cs: ChatService,
    private hs: HeaderService,
    private route: ActivatedRoute
  ) {
    //esto lo ponemos para que cuando vuelva de una room a rooms se llamen a
    //estas funciones ya qeu con back, el ngoninit no se ejecuta otra vez
    route.params.subscribe((val) => {
      this.hs.setHref('/home');
      this.hs.setTitle('Rooms');
    });
  }

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
        //put go home
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
