import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BASE_PATH } from '@hydro-flow/data-access/raincell'
import { FeatureMapModule } from '@hydro-flow/feature/map'
import { UiMapModule } from '@hydro-flow/ui/map'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { MapContainerComponent } from './components/map-container/map-container.component';
import { CellLegendComponent } from './components/cell-legend/cell-legend.component'

export const API_URL = '/api/'

@NgModule({
  declarations: [AppComponent, HeaderComponent, MapContainerComponent, CellLegendComponent],
  imports: [BrowserModule, UiMapModule, HttpClientModule, FeatureMapModule],
  providers: [
    {
      provide: BASE_PATH,
      useFactory: () => API_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
