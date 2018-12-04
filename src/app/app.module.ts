import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpinnerDirective } from '../ng-spinner/ngSpinner.directive';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [SpinnerDirective],
  bootstrap: [AppComponent]
})
export class NgSpinnerModule { }
