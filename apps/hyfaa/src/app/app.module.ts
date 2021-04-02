import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { UiMapModule } from '@hydro-flow/ui/map'

import { AppComponent } from './app.component';
import { MapContainerComponent } from './components/map-container/map-container.component'

@NgModule({
  declarations: [AppComponent, MapContainerComponent],
  imports: [BrowserModule, UiMapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
