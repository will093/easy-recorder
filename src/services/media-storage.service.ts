import { Injectable } from '@angular/core';
import { Media } from '../model/media.model';
import { Observable, } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable()
export class MediaStorageService {

  constructor(private storage: Storage) { }

  set(media: Media): Observable<boolean> {
    const result = Observable.from(this.storage.set(media.id, media));
    return result;
  }

  getAll(): Observable<{ [key:string]: Media }> {
    const items = {};
    const result = Observable.from(this.storage.forEach((v, k) => { items[k] = v } ));
    return result.pipe(
      map(v => items)
    );
  }

  getNextMediaNumber(): Observable<number> {
    return this.getAll().pipe(
      map(media => {
        // Include 0 for the case when no recordings exist.
        const existingMediaNumbers = [ 0, ...Object.keys(media).map(k => parseInt(k))];
        return Math.max(...existingMediaNumbers) + 1;
      })
    );
  }
}
