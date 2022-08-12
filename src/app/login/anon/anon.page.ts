import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  signInAnonymously,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-anon',
  templateUrl: './anon.page.html',
  styleUrls: ['./anon.page.scss'],
})
export class AnonPage implements OnInit {
  constructor(public navigation : NavigationService) {}
  name: string = '';
  showAccessButton : boolean;

  ngOnInit() {
    
  }

  

  
  
}
