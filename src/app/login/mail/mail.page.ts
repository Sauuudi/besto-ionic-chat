import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  constructor(
    private chat: ChatService,
    public navigation: NavigationService
  ) {}

  ngOnInit() {
  }


}
