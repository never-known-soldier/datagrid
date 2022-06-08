import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss'],
})
export class TestViewComponent implements AfterViewInit {

  @Input() rowData: object;

  constructor() {
  }

  ngAfterViewInit() {
    // console.log(this.rowData);
  }
}
