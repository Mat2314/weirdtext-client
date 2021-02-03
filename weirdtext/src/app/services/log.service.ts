import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private devMode: boolean = isDevMode();

  constructor() { }

  log(message: any) {
    // Log messages only if DevMode is on
    if (this.devMode) {
      console.log(message);
    }
  }
}
