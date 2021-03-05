import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import Map from 'ol/Map'
import { easeOut } from 'ol/easing'

const DURATION = 250

@Component({
  selector: 'ui-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomComponent implements OnInit {
  @Input() map: Map

  constructor() {}

  ngOnInit() {}

  zoomByDelta(delta: number) {
    const view = this.map.getView()
    if (!view) {
      return
    }
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta);
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.animate({
          zoom: newZoom,
          duration: DURATION,
          easing: easeOut,
        });
    }
  }
}
