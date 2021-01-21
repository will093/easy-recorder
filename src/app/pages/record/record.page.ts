import moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController, NavParams } from '@ionic/angular';

import { Media } from '../../shared/models/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { Observable, timer } from 'rxjs';
import Recorder from 'recorder-js';
import { shareReplay, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-record',
  templateUrl: 'record.page.html',
  styleUrls: ['record.page.scss']
})
export class RecordPage implements OnInit {

  audioContext: AudioContext;
  recorderStatuses: typeof RecorderStatuses;

  recorder: any;
  currentStatus: RecorderStatuses;

  blob: Blob;
  blobUrl: SafeUrl;

  timeElapsed: Observable<number>;

  constructor(
    private sanitizer: DomSanitizer,
    private mediaStorage: MediaStorageService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.audioContext = new AudioContext;
    this.currentStatus = RecorderStatuses.NotStarted;
    this.recorderStatuses = RecorderStatuses;
  }

  startRecord() {
    const constraints = { audio: true };

    console.log("Recording started");
    // TODO: Check if browser supports getUserMedia
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.currentStatus = RecorderStatuses.Recording;
        this.recorder = new Recorder(this.audioContext);
        this.recorder.init(stream);
        this.recorder.start();
        this.timeElapsed = timer(0, 1000).pipe(shareReplay());
        console.log("Recording started");
      })
      .catch(function (err) {
        /* handle the error */
      });
  }

  stopRecord() {
    this.recorder.stop().then(({ buffer, blob }) => {
      this.currentStatus = RecorderStatuses.Stopped;
      console.log("Recording stopped");
      this.blob = blob;
      const url = URL.createObjectURL(blob);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(url);

      this.mediaStorage.getNextMediaNumber().pipe(withLatestFrom(this.timeElapsed)).subscribe(([number, timeElapsed]) => {

        const media: Media = {
          name: `Recording ${number}`,
          id: number.toString(),
          blob: blob,
          mimeType: this.blob.type,
          dateTime: moment().toISOString(),
          length: timeElapsed,
        }

        this.mediaStorage.set(media);
        console.log("Media stored in indexedDB", media);

        this.navCtrl.navigateRoot('');
      });
    });
  }

  cancelRecord() {
    this.recorder = undefined;
    this.timeElapsed = undefined;
    this.currentStatus = RecorderStatuses.NotStarted;
  }
}

export enum RecorderStatuses {
  NotStarted = 1,
  Recording = 2,
  Stopped = 3,
}
