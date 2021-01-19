import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecordingsListPage } from './recordings-list.page';
import { RouterModule } from '@angular/router';
import { TimerModule } from '../../pipes/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimerModule,
    RouterModule.forChild([{ path: '', component: RecordingsListPage}])
  ],
  declarations: [RecordingsListPage]
})
export class RecordingsListPageModule {}
