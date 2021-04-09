import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { UiMapModule } from '@hydro-flow/ui/map'

import { AppComponent } from './app.component'
import { MapContainerComponent } from './components/map-container/map-container.component'
import { RiverSegmentOverlayComponent } from './layers/river-segment-overlay/river-segment-overlay.component'

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    RiverSegmentOverlayComponent,
  ],
  imports: [BrowserModule, UiMapModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
