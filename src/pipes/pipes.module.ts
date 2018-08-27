import { NgModule } from '@angular/core';
import { TimerPipe } from './timer.pipe';

@NgModule({
  declarations: [
    TimerPipe,
  ],
  exports: [
    TimerPipe,
  ]
})
export class PipesModule { }
