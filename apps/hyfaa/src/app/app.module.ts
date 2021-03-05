import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiMapModule } from '@hydro-flow/ui/map';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiMapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
