import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BASE_PATH, StationsApiService } from '@hydro-flow/data-access/hyfaa'
import { ChartMapper, FeatureStationsModule } from '@hydro-flow/feature/hydro'
import { FeatureMapModule } from '@hydro-flow/feature/map'
import {
  FeatureSharedModule,
  getDefaultLang,
  getLangFromBrowser,
  TRANSLATE_DEFAULT_CONFIG,
} from '@hydro-flow/feature/shared'
import { DateSelectorModule } from '@hydro-flow/feature/time'
import { UiMapModule } from '@hydro-flow/ui/map'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { environment } from '../environments/environment'
import { SaguiEffects } from './+state/sagui.effects'
import { SaguiFacade } from './+state/sagui.facade'
import * as fromSagui from './+state/sagui.reducer'
import { SAGUI_FEATURE_KEY } from './+state/sagui.reducer'
import { StationsSaguiApiService } from './api/stations-sagui.api.service'

import { AppComponent } from './app.component'
import { ChartContainerComponent } from './components/chart-container/chart-container.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { LegendContainerComponent } from './components/legend-container/legend-container.component'
import { MapContainerComponent } from './components/map-container/map-container.component'
import { SegmentLegendComponent } from './components/segment-legend/segment-legend.component'
import { SerieSelectorComponent } from './components/serie-selector/serie-selector.component'
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component'
import { RiverSegmentOverlayComponent } from './layers/river-segment-overlay/river-segment-overlay.component'
import { SaguiChartMapper } from './services/sagui.chart.mapper'
import { TabPanelComponent } from './ui/tab-panel/tab-panel.component'

export const API_URL = '/api/v1'

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    RiverSegmentOverlayComponent,
    LegendContainerComponent,
    ChartContainerComponent,
    SerieSelectorComponent,
    SegmentLegendComponent,
    HeaderComponent,
    TabsContainerComponent,
    TabPanelComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    UiMapModule,
    DateSelectorModule,
    HttpClientModule,
    FeatureStationsModule,
    FeatureMapModule,
    FeatureSharedModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(SAGUI_FEATURE_KEY, fromSagui.reducer),
    EffectsModule.forFeature([SaguiEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
  ],
  providers: [
    SaguiFacade,
    {
      provide: BASE_PATH,
      useFactory: () => API_URL,
    },
    {
      provide: StationsApiService,
      useClass: StationsSaguiApiService,
    },
    {
      provide: ChartMapper,
      useClass: SaguiChartMapper,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    const lang = getLangFromBrowser() || getDefaultLang()
    translate.setDefaultLang(lang)
    translate.use(lang)
  }
}
