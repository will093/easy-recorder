import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { Media } from '../../model/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import Recorder from 'recorder-js';

/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {

  recorder: any;
  audioContext: AudioContext;
  blob: Blob;
  blobUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer, private mediaStorage: MediaStorageService) { }

  ngOnInit() {
    this.audioContext = new AudioContext
  }

  startRecord() {
    const constraints = { audio: true };

    // TODO: Check if browser supports getUserMedia
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.recorder = new Recorder(this.audioContext);
        this.recorder.init(stream);
        this.recorder.start();
        console.log("Recording started");
      })
      .catch(function (err) {
        /* handle the error */
      });
  }

  stopRecord() {
    this.recorder.stop().then(({buffer, blob}) => {
      console.log("Recording stopped");
      this.blob = blob;
      const url = URL.createObjectURL(blob);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(url);

      const media: Media = {
        name: 'test',
        id: '1',
        blob: blob,
        mimeType: this.blob.type
      }

      this.mediaStorage.set(media);
      console.log("Media stored in indexedDB");
    });
  }

}
