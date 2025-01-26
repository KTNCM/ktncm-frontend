import { Injectable, PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Gets an item from local storage.
   * @param key - Key of the item.
   * @returns - Item if found or null.
   */
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Saves an item under the provided key in local storage.
   * @param key - Key of the item.
   * @param value - Value of the item.
   */
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Removes an item for provided key from local storage.
   * @param key Key of the item.
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}
