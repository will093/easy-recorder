import { Injectable } from '@angular/core';
import { Media } from '../model/media.model';
import { Observable, } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()
export class MediaStorageService {

  constructor(private storage: Storage) { }

  set(media: Media): Observable<boolean> {
    const result = Observable.from(this.storage.set(media.id, media));
    result.subscribe(() => {}, e => console.log(e));
    return result;
  }
}
