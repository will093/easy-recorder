import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { Media } from '../../model/media.model';
import { MediaStorageService } from '../../services/media-storage.service';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public $media: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private mediaStorageService: MediaStorageService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.$media = this.mediaStorageService.getAll().pipe(
      map(v => Object.keys(v).map(key => v[key])),
      tap(medias => medias.forEach(media => {
        const url = URL.createObjectURL(media.blob);
        (media as any).blobUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      }))
    );
  }
}
