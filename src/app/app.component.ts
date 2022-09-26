import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { NavigationService } from './services/navigation.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private cs: ChatService, public navigation: NavigationService) {
    this.navigation.startSaveHistory();
  }

  
}
