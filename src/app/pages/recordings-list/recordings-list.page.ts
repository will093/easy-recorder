import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { Media } from '../../shared/models/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { NavController } from '@ionic/angular';
import moment from 'moment';

@Component({
  selector: 'app-recordings-list',
  templateUrl: 'recordings-list.page.html',
  styleUrls: ['recordings-list.page.scss']
})
export class RecordingsListPage implements OnDestroy {

  public medias: HomeMedia[];

  public currentMedia: HomeMedia;
  public currentAudio: HTMLAudioElement;
  public $currentAudioTime: Observable<number>;

  public $destroy = new Subject<any>();

  constructor(
    public navCtrl: NavController,
    private mediaStorageService: MediaStorageService,
  ) {}

  ionViewWillEnter(): void {
    this.setMedias();
  }

  setMedias() {
    this.mediaStorageService.getAll().pipe(
      takeUntil(this.$destroy),
      // Sort in reverse chronological order.
      map(v => Object.keys(v).map(key => v[key]).sort((a, b) => { return moment(a.dateTime) < moment(b.dateTime) ? 1 : -1 })),
      // Set the blobUrl for each media.
      map(medias => medias
        .map(media => {
          console.log(media);
          // TODO: handle errors.
          let url = URL.createObjectURL(media.blob);
          // try {
          //   URL.createObjectURL(media.blob);
          // } catch (e) {
          //   console.warn(e);
          // }
          media.blobUrl = url;
          return media as HomeMedia;
        })
        .filter(media => media.blobUrl)
      ),
    ).subscribe(medias => {
      this.medias = medias;
    });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  onAudioClick(media: HomeMedia) {
    if (!this.mediaIsSelected(media)) {
      this.playAudio(media);
    } else if (this.mediaIsPlaying(media)) {
      this.currentAudio.pause();
    } else {
      this.currentAudio.play();
    }
  }

  onDeleteClick(media: HomeMedia) {
    this.mediaStorageService.delete(media.id).subscribe(() => {
      this.setMedias();
    });
  }

  private playAudio(media: HomeMedia) {
    // Set current media and current audio
    this.currentMedia = media;
    this.currentAudio = new Audio(media.blobUrl);

    this.currentAudio.play();

    // Observable for displaying the current number of seconds through the audio to the nearest integer (Math.round matches ion-range progress).
    this.$currentAudioTime = timer(0, 500).pipe(
      map(() => this.currentAudio.paused ? Math.floor(this.currentAudio.currentTime) : Math.round(this.currentAudio.currentTime))
    );
  }

  mediaIsSelected(media: HomeMedia) {
    return this.currentMedia && media.id === this.currentMedia.id;
  }

  mediaIsPlaying(media: HomeMedia) {
    return this.mediaIsSelected(media) && !this.currentAudio.paused;
  }

  toggleMediaMenu(event, media: any) {
    event.preventDefault();
    event.stopPropagation();
    this.medias.forEach(m => {
      if (m.id !== media.id) { m.showMenu = false }
    });
    media.showMenu = !media.showMenu;
  }

  hideMediaMenu() {
    this.medias.map(m => m.showMenu = false)
  }

}

// Interface for media with additional properties specific to home page.
export interface HomeMedia extends Media {
  showMenu: boolean;
  blobUrl: string;
}
