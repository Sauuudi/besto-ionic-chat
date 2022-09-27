import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private hs: HeaderService, private route: ActivatedRoute) {
    //esto lo ponemos para que cuando vuelva de una room a rooms se llamen a
    //estas funciones ya qeu con back, el ngoninit no se ejecuta otra vez
    route.params.subscribe((val) => {
      this.hs.setHref('/home');
      this.hs.setTitle('Rooms');
    });
  }

  ngOnInit() {
    this.hs.setHref('home');
    this.hs.setTitle('BESTO CHAT');
  }
}
