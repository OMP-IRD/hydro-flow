import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core'
import { Feature } from 'ol/Feature'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import { filter, map } from 'rxjs/operators'
import { HyfaaFacade } from '../../+state/hyfaa.facade'
import { MapManagerService } from '../../map/map-manager.service'
import { formatDate } from '../../utils'
import { RiverSegmentLayer } from '../river-segment.layer'

export const SEGMENT_HOVER_MIN_RESOLUTION = 615

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

  get properties(): object[] {
    return this.mapManager.getHLSegment()?.getProperties()
  }

  get currentFlow(): number {
    return
    this.mapManager
      .getHLSegment()
      ?.get('values')
      ?.find((value) => value.date === this.currentDate).flow
  }

  constructor(
    private _element: ElementRef,
    private mapManager: MapManagerService,
    private riverSegmentLayer: RiverSegmentLayer,
    private _changeDetectionRef: ChangeDetectorRef,
    private facade: HyfaaFacade
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
      const resolution = this.map.getView().getResolution()
      if (resolution > SEGMENT_HOVER_MIN_RESOLUTION) {
        return
      }

      const hovering = this.map.forEachLayerAtPixel(
        event.pixel,
        (layer) => true,
        { layerFilter: (layer) => layer === this.riverSegmentLayer.getLayer() }
      )
      if (hovering) {
        const hit = this.getHit(event.pixel)
        if (hit) {
          this.map.getTarget().style.cursor = 'pointer'
          this._overlay.setPosition(event.coordinate)
          this.mapManager.setHLSegment(hit)
          this._changeDetectionRef.detectChanges()
          this.riverSegmentLayer.getLayer().changed()
        }
      } else {
        if (this.mapManager.getHLSegment()) {
          console.log('reset hovering')
          this.map.getTarget().style.cursor = ''
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

    this.facade.currentDate$
      .pipe(
        filter((date) => !!date),
        map((date: Date) => formatDate(date))
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
