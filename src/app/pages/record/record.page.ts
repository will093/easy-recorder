import moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Media } from '../../shared/models/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { Observable, timer } from 'rxjs';
import Recorder from 'recorder-js';
import { shareReplay, withLatestFrom } from 'rxjs/operators';
@Component({
  selector: 'er-record',
  templateUrl: 'record.page.html',
  styleUrls: ['record.page.scss']
})
export class RecordPage implements OnInit {

  recorderStatuses: typeof RecorderStatuses;
  currentStatus: RecorderStatuses;;
  timeElapsed: Observable<number>;

  private audioContext?: AudioContext;
  private recorder?: any;
  private track?: MediaStreamTrack;

  constructor(
    private mediaStorage: MediaStorageService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.audioContext = new AudioContext;
    this.currentStatus = RecorderStatuses.NotStarted;
    this.recorderStatuses = RecorderStatuses;
  }

  startRecord(): void {
    const constraints = { audio: true };

    // TODO: handle case where browser doesn't support this API.
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.currentStatus = RecorderStatuses.Recording;
        this.recorder = new Recorder(this.audioContext);
        this.recorder.init(stream);
        this.recorder.start();
        this.timeElapsed = timer(0, 1000).pipe(shareReplay());

        this.track = stream.getTracks()[0];
      });
  }

  stopRecord(): void {
    this.recorder.stop().then(({ blob }) => {
      this.track.stop();
      this.currentStatus = RecorderStatuses.Stopped;

      this.mediaStorage.getNextMediaNumber().pipe(withLatestFrom(this.timeElapsed)).subscribe(([number, timeElapsed]) => {

        const media: Media = {
          name: `Recording ${number}`,
          id: number.toString(),
          blob: blob,
          mimeType: blob.type,
          dateTime: moment().toISOString(),
          length: timeElapsed,
        }

        this.mediaStorage.set(media);
        this.navCtrl.navigateRoot('');
      });
    });
  }

  cancelRecord(): void {
    this.track.stop();
    this.recorder = undefined;
    this.timeElapsed = undefined;
    this.currentStatus = RecorderStatuses.NotStarted;
  }
}

enum RecorderStatuses {
  NotStarted = 1,
  Recording = 2,
  Stopped = 3,
}
