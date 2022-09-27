import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-anon',
  templateUrl: './anon.page.html',
  styleUrls: ['./anon.page.scss'],
})
export class AnonPage implements OnInit {
  constructor(
    private chat: ChatService
  ) {}
  name: string = '';
  showAccessButton: boolean;

  ngOnInit() {
    this.showAccessButton = false;
  }
  async setUserName() {
    if (this.name.length >=  5) {
      await this.chat.loginAnonWithName(this.name);
      this.showAccessButton = true;
    }
  }
}
