import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  ls: any;
  constructor() {
    this.ls = new SecureLS();
  }
  // Set the json data to local storage
  set(key: string, value: any) {
    this.ls.set(key, value);
  }
  // Get the json value from local storage
  get(key: string) {
    return this.ls.get(key);
  }
  has(key: string): boolean {
    return this.get(key) ? true : false;
  }
  // Clear the local storage
  clear() {
    return this.ls.removeAll();
  }
}
