import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private defaultTitle = 'BESTO CHAT';
  private defaultHref = 'home';
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject(
    this.defaultTitle
  );
  private hrefSubject: BehaviorSubject<string> = new BehaviorSubject(
    this.defaultHref
  );
  public title: Observable<string>;
  public href: Observable<string>;

  constructor() {
    this.title = this.titleSubject.asObservable();
    this.href = this.hrefSubject.asObservable();
  }

  //EXPLICACION DE ESTO
  //para poder cambiar el titulo de las pagians y la direccion a donde apunta el boton back del header principal de app component,
  //he creado un servicio para poder acceder a ese headr ya que se encuentra en parent y asi desde los child asi es mas facil de gestionar

  //set el titulo del header
  public setTitle(title: string) {
    this.titleSubject.next(title);
  }

  //set href del buton back de app component
  public setHref(href: string) {
    this.hrefSubject.next(href);
  }
}
