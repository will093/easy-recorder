import { Component, OnInit, ViewChildren } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Media } from '../../model/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import moment from 'moment';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public $media: Observable<Media[]>;

  public currentMedia: Media;
  public currentAudio: HTMLAudioElement;
  public $currentAudioTime: Observable<number>;

  constructor(
    public navCtrl: NavController,
    private mediaStorageService: MediaStorageService,
  ) {}

  ngOnInit(): void {
    this.$media = this.mediaStorageService.getAll().pipe(
      // Sort in reverse chronological order.
      map(v => Object.keys(v).map(key => v[key]).sort((a, b) => { return moment(a.dateTime) < moment(b.dateTime) ? 1 : -1 })),
      // Set the blobUrl for each media.
      tap(medias => medias.forEach(media => {
        const url = URL.createObjectURL(media.blob);
        media.blobUrl = url;
      }))
    );
  }

  onAudioClick(media: Media) {
    if (!this.mediaIsSelected(media)) {
      this.playAudio(media);
    } else if (this.mediaIsPlaying(media)) {
      this.currentAudio.pause();
    } else {
      this.currentAudio.play();
    }
  }

  private playAudio(media: Media) {
    const url = URL.createObjectURL(media.blob);

    // Set current media and current audio
    this.currentMedia = media;
    this.currentAudio = new Audio(media.blobUrl);

    this.currentAudio.play();

    // Observable for displaying the current number of seconds through the audio to the nearest integer (Math.round matches ion-range progress).
    this.$currentAudioTime = timer(0, 500).pipe(
      map(() => this.currentAudio.paused ? Math.floor(this.currentAudio.currentTime) : Math.round(this.currentAudio.currentTime))
    );
  }

  mediaIsSelected(media: Media) {
    return this.currentMedia && media.id === this.currentMedia.id;
  }

  mediaIsPlaying(media: Media) {
    return this.mediaIsSelected(media) && !this.currentAudio.paused;
  }

}
