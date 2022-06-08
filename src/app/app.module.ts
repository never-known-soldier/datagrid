import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule, DxDropDownBoxModule, DxButtonModule, DxTextAreaModule, DxFormModule, DxListModule, DxSelectBoxModule, DxLookupModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GridListComponent } from './pages/grid/grid.component';
import { ValidationViewComponent } from './pages/grid/validation-view/validation-view.component';
import { TestViewComponent } from './pages/grid/test-view/test-view.component';

import { DevExtremeModule } from 'devextreme-angular';
import { ProductService } from './shared/services';

@NgModule({
  declarations: [
    AppComponent,
    GridListComponent,
    ValidationViewComponent,
    TestViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DevExtremeModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxListModule,
    DxButtonModule,
    HttpClientModule,
    DxTextAreaModule,
    DxFormModule,
    DxSelectBoxModule,
    DxLookupModule],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
