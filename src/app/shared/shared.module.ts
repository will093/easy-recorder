import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerPipe } from './pipes/timer/timer.pipe';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TimerPipe,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    TimerPipe,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
