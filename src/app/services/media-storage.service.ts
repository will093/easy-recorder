import { Injectable } from '@angular/core';
import { Media } from '../shared/models/media.model';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaStorageService {

  constructor(private storage: Storage) { }

  set(media: Media): Observable<boolean> {
    const result = from(this.storage.set(media.id, media));
    return result;
  }

  getAll(): Observable<{ [key:string]: Media }> {
    const items = {};
    const result = from(this.storage.forEach((v, k) => { items[k] = v } ));
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

  delete(mediaId: string): Observable<boolean> {
    const result = from(this.storage.remove(mediaId));
    return result;
  }
}
