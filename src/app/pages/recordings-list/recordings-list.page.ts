import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Media } from '../../shared/models/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { NavController } from '@ionic/angular';
import moment from 'moment';

@Component({
  selector: 'app-recordings-list',
  templateUrl: 'recordings-list.page.html',
  styleUrls: ['recordings-list.page.scss'],
})
export class RecordingsListPage implements OnDestroy {

  public medias: Media[];
  public selectedMediaId?: string;

  public $destroy = new Subject<any>();

  constructor(
    public navCtrl: NavController,
    private mediaStorageService: MediaStorageService,
  ) {}

  ionViewWillEnter(): void {
    this.getMedias();
  }

  getMedias() {
    this.mediaStorageService.getAll().pipe(
      takeUntil(this.$destroy),
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
    ).subscribe(medias => {
      this.medias = medias;
    });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  onSelectAudio(media: Media) {
    this.selectedMediaId = media.id
  }

  onDeleteAudio(media: Media) {
    this.mediaStorageService.delete(media.id).subscribe(() => {
      this.getMedias();
    });
  }
}