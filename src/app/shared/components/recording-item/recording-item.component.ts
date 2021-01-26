import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Media } from '../../models/media.model';

@Component({
  selector: 'er-recording-item',
  templateUrl: './recording-item.component.html',
  styleUrls: ['./recording-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordingItemComponent implements OnInit {

  @Input()
  isSelected: boolean;

  @Input()
  media: Media;

  @Output()
  selectAudio = new EventEmitter<void>();

  @Output()
  deleteAudio = new EventEmitter<void>();

  audioElement?: HTMLAudioElement;
  $currentTime?: Observable<number>;
  showMenu: boolean;

  ngOnInit() {}

  onAudioClick() {
    this.selectAudio.emit();
    if (!this.isSelected) {
      this.createAndPlayAudio();
    } else if (this.isPlaying()) {
      this.audioElement.pause();
    } else {
      this.audioElement.play();
    }
  }

  isPlaying(): boolean {
    return this.isSelected && this.audioElement && !this.audioElement.paused;
  }

  onDeleteClick(): void {
    this.deleteAudio.emit();
  }

  private createAndPlayAudio(): void {
    this.audioElement = new Audio(this.media.blobUrl);
    this.audioElement.play();

    // Observable for displaying the current number of seconds through the audio to the nearest integer (Math.round matches ion-range progress).
    this.$currentTime = timer(0, 500).pipe(
      map(() => this.audioElement.paused 
        ? Math.floor(this.audioElement.currentTime) 
        : Math.round(this.audioElement.currentTime)
      )
    );
  }

  onMenuButtonClick($event: any): void {
    $event.stopPropagation();
    this.showMenu = !this.showMenu;
  }


  onCloseMenu(): void {
    this.showMenu = false;
  }
}