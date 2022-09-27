import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { HeaderService } from './services/header.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  href;
  title;
  constructor(private cs: ChatService, private hs : HeaderService) {

    this.hs.title.subscribe(value => this.title = value);
    this.hs.href.subscribe(value => this.href = value);
    
  }
}
