import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Media } from '../../shared/models/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { NavController } from '@ionic/angular';
import moment from 'moment';

@Component({
  selector: 'app-recordings-list',
  templateUrl: 'recordings-list.page.html',
  styleUrls: ['recordings-list.page.scss'],
})
export class RecordingsListPage {

  public medias$: Observable<Media[]>;
  public selectedMediaId?: string;

  constructor(
    public navCtrl: NavController,
    private mediaStorageService: MediaStorageService,
  ) {}

  ionViewWillEnter(): void {
    this.getMedias();
  }

  getMedias(): void {
    this.medias$ = this.mediaStorageService.getAll().pipe(
      map(v => Object
        .keys(v)
        .map(key => v[key])
        // Sort in reverse chronological order.
        .sort((a, b) => { return moment(a.dateTime) < moment(b.dateTime) ? 1 : -1 })
        // Set the blobUrl for each media.
        .map(media => {
          let url = URL.createObjectURL(media.blob);
          media.blobUrl = url;
          return media;
        })
      ),
    );
  }

  onSelectAudio(media: Media): void {
    this.selectedMediaId = media.id
  }

  onDeleteAudio(media: Media): void {
    this.mediaStorageService.delete(media.id).subscribe(() => {
      this.getMedias();
    });
  }
}