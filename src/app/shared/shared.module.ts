import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerPipe } from './pipes/timer/timer.pipe';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RecordingItemComponent } from './components/recording-item/recording-item.component';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    TimerPipe,
    HeaderComponent,
    FooterComponent,
    RecordingItemComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    TimerPipe,
    HeaderComponent,
    FooterComponent,
    RecordingItemComponent,
    ClickOutsideDirective,
  ]
})
export class SharedModule { }
