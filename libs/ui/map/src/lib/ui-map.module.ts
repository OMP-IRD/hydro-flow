import { NgModule } from '@angular/core'
import { CommonModule, DecimalPipe } from '@angular/common'
import { FullscreenComponent } from './components/fullscreen/fullscreen.component'
import { MapComponent } from './components/map/map.component'
import { MousePositionComponent } from './components/mouse-position/mouse-position.component'
import { ScaleLineComponent } from './components/scale-line/scale-line.component'
import { ZoomComponent } from './components/zoom/zoom.component'
import { LegendComponent } from './components/legend/legend.component'

@NgModule({
  declarations: [
    MousePositionComponent,
    MapComponent,
    ScaleLineComponent,
    FullscreenComponent,
    ZoomComponent,
    LegendComponent,
  ],
  imports: [CommonModule],
  exports: [
    MousePositionComponent,
    MapComponent,
    ScaleLineComponent,
    FullscreenComponent,
    ZoomComponent,
    LegendComponent,
  ],
  providers: [DecimalPipe],
})
export class UiMapModule {}
