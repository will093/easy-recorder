import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'er-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
