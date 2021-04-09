import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import { Feature } from 'ol/Feature'
import { MapManagerService } from '../../map/map-manager.service'
import { RiverSegmentLayer } from '../river-segment.layer'

@Component({
  selector: 'hyfaa-river-segment-overlay',
  templateUrl: './river-segment-overlay.component.html',
  styleUrls: ['./river-segment-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiverSegmentOverlayComponent implements OnInit {
  @Input() map: Map
  private _overlay: Overlay

  get properties(): object {
    return this.mapManager.getHLSegment()?.getProperties()
  }

  constructor(
    private _element: ElementRef,
    private mapManager: MapManagerService,
    private riverSegmentLayer: RiverSegmentLayer,
    private _changeDetectionRef: ChangeDetectorRef
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
      const hit = this.getHit(event.pixel)
      if (hit) {
        this.map.getTarget().style.cursor = 'pointer'
        this._overlay.setPosition(event.coordinate)
      } else {
        this.map.getTarget().style.cursor = ''
        this._overlay.setPosition(undefined)
      }
      this.mapManager.setHLSegment(hit)
      this._changeDetectionRef.detectChanges()
      this.riverSegmentLayer.getLayer().changed()
    })

    this.map.on('dblclick', (event) => {
      const hit = this.getHit(event.pixel)
      if (hit) {
        this.map.getView().fit(hit.getGeometry().getExtent(), {
          maxZoom: 10,
        })
      }
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
