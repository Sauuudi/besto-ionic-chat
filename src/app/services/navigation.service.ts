import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];
  constructor(private router: Router, private location: Location) {}

  public startSaveHistory(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
  public goBack() {
    this.history.pop();
    if(this.history.length > 0 ){
      this.location.back()
    }
    else{
      this.router.navigateByUrl("/")
    }
  }
  public goHome(){
    this.history = [];
    this.router.navigateByUrl("/")
  }

  public getUrl(){
    return this.router.url;
  }
}
