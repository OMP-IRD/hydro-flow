import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DateFacade } from '@hydro-flow/feature/time'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import { filter, map } from 'rxjs/operators'
import { MapManagerService } from '../../map/map-manager.service'
import { formatDate } from '../../utils'
import { RiverSegmentLayer } from '../river-segment.layer'
import { StationLayer } from '../station.layer'

export const SEGMENT_HOVER_MIN_RESOLUTION = 615

marker('hydro.flow.history')
marker('hydro.rain.history')

@Component({
  selector: 'hyfaa-river-segment-overlay',
  templateUrl: './river-segment-overlay.component.html',
  styleUrls: ['./river-segment-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiverSegmentOverlayComponent implements OnInit {
  map: Map
  private _overlay: Overlay
  currentDate: string

  get properties(): any {
    return this.mapManager.getHLSegment()?.getProperties()
  }

  get isBassin(): boolean {
    return this.properties?.values[0]?.hasOwnProperty('rain')
  }

  get label(): string {
    return this.isBassin ? 'hydro.rain.history' : 'hydro.flow.history'
  }

  constructor(
    private _element: ElementRef,
    private mapManager: MapManagerService,
    private riverSegmentLayer: RiverSegmentLayer,
    private stationsLayer: StationLayer,
    private _changeDetectionRef: ChangeDetectorRef,
    private dateFacade: DateFacade
  ) {}

  ngOnInit() {
    this.map = this.mapManager.map

    this._overlay = new Overlay({
      element: this._element.nativeElement,
      autoPan: true,
      offset: [20, 0],
      autoPanAnimation: {
        duration: 250,
      },
      positioning: 'center-left',
    })

    this.map.addOverlay(this._overlay)

    this.map.on('pointermove', (event) => {
      const hovering = this.map.forEachLayerAtPixel(
        event.pixel,
        (layer) => (this.riverSegmentLayer.getLayer() ? layer : true),
        {
          layerFilter: (layer) =>
            layer === this.riverSegmentLayer.getLayer() ||
            layer === this.stationsLayer.getLayer(),
        }
      )
      const target = this.map.getTarget() as HTMLElement
      if (hovering === this.riverSegmentLayer.getLayer()) {
        const hit = this.getHit(event.pixel)
        const target = this.map.getTarget() as HTMLElement
        if (hit) {
          target.style.cursor = 'pointer'
          this._overlay.setPosition(event.coordinate)
          this.mapManager.setHLSegment(hit)
          this._changeDetectionRef.detectChanges()
          this.riverSegmentLayer.getLayer().changed()
        }
      } else {
        if (this.mapManager.getHLSegment()) {
          target.style.cursor = ''
          this._overlay.setPosition(undefined)
          this.mapManager.setHLSegment(null)
          this._changeDetectionRef.detectChanges()
          this.riverSegmentLayer.getLayer().changed()
        }
      }
    })

    this.map.on('dblclick', (event) => {
      const hit = this.getHit(event.pixel)
      if (hit) {
        this.map.getView().fit(hit.getGeometry().getExtent(), {
          maxZoom: 10,
        })
      }
    })

    this.dateFacade.currentDate$
      .pipe(
        filter((date) => !!date)
        // map((date: Date) => formatDate(date))
      )
      .subscribe((date) => {
        this.currentDate = date
      })
  }

  private getHit(pixel: number[]) {
    return this.map.forEachFeatureAtPixel(
      pixel,
      (feature: Feature) => {
        return feature
      },
      { layerFilter: (layer) => layer === this.riverSegmentLayer.getLayer() }
    )
  }
}
