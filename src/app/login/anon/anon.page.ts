import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-anon',
  templateUrl: './anon.page.html',
  styleUrls: ['./anon.page.scss'],
})
export class AnonPage implements OnInit {
  constructor(
    private chat: ChatService,
    public navigation: NavigationService
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
