import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { RecordPage } from './record';
import { TimerPipe } from './timer.pipe';

@NgModule({
  declarations: [
    RecordPage,
    TimerPipe,
  ],
  imports: [
    IonicPageModule.forChild(RecordPage),
  ],
  entryComponents: [
    RecordPage
  ]
})
export class RecordPageModule {}
