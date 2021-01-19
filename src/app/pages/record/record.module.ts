import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecordPage } from './record.page';
import { RouterModule } from '@angular/router';
import { TimerModule } from '../../pipes/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimerModule,
    RouterModule.forChild([{ path: '', component: RecordPage }]),
  ],
  declarations: [RecordPage]
})
export class RecordPageModule {}
