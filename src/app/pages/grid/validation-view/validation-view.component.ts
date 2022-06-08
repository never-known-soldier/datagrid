import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'validation-view',
  templateUrl: './validation-view.component.html',
  styleUrls: ['./validation-view.component.scss'],
})
export class ValidationViewComponent implements AfterViewInit {

  @Input() rowData: object;

  constructor() {
  }

  ngAfterViewInit() {
    // console.log(this.rowData);
  }
}
