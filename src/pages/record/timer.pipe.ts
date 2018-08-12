import { Pipe, PipeTransform } from '@angular/core';

/*
 * Display a time given in seconds as a string in the form mm:ss.
 */
@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
  transform(value: number): string {
    const mins = `00${Math.floor(value/60)}`.slice(-2);
    const secs = `00${value%60}`.slice(-2);
    return `${mins}:${secs}`;
  }
}
