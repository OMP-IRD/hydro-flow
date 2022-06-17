import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { easeOut } from 'ol/easing'
import Map from 'ol/Map'

const DURATION = 250

@Component({
  selector: 'ui-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomComponent {
  @Input() map: Map

  zoomByDelta(delta: number) {
    const view = this.map.getView()
    if (!view) {
      return
    }
    const currentZoom = view.getZoom()
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta)
      if (view.getAnimating()) {
        view.cancelAnimations()
      }
      view.animate({
        zoom: newZoom,
        duration: DURATION,
        easing: easeOut,
      })
    }
  }
}
