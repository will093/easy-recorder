import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';
import { RecordPage } from './record';

@NgModule({
  declarations: [
    RecordPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordPage),
    PipesModule
  ],
  entryComponents: [
    RecordPage
  ]
})
export class RecordPageModule {}
