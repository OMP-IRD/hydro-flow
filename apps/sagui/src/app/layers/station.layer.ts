import { Injectable } from '@angular/core'
import { StationsFacade } from '@hydro-flow/feature/hydro'
import { DateFacade } from '@hydro-flow/feature/time'
import { MapBrowserEvent } from 'ol'
import { Extent } from 'ol/extent'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import VectorSource from 'ol/source/Vector'
import { Style } from 'ol/style'
import { from, fromEvent } from 'rxjs'
import { debounceTime, filter, skip, switchMap } from 'rxjs/operators'
import { SaguiFacade } from '../+state/sagui.facade'
import { MapManagerService } from '../map/map-manager.service'
import { stationStyleFn } from './station.style'

export const STATION_COLOR = 'rgb(222, 43, 178)'
@Injectable({
  providedIn: 'root',
})
export class StationLayer {
  map: Map
  private layer: VectorLayer<VectorSource>
  private source: VectorSource
  private currentDate: string
  private hoverStation: Feature = null

  constructor(
    private mapManager: MapManagerService,
    private facade: SaguiFacade,
    private stationFacade: StationsFacade,
    private dateFacade: DateFacade
  ) {
    this.map = this.mapManager.map

    this.source = new VectorSource({
      wrapX: false,
    })

    this.layer = new VectorLayer({
      source: this.source,
      className: 'station-layer',
      style: this.stationStyleFn.bind(this),
      zIndex: 10,
    })

    this.stationFacade.allStations$.pipe(skip(1)).subscribe((stations) => {
      this.clear()
      this.source.addFeatures(stations)
      this.layer.changed()
    })

    this.initInteractions_()

    this.dateFacade.currentDate$
      .pipe(filter((date) => !!date))
      .subscribe((date) => {
        this.currentDate = date
        this.layer.changed()
      })
  }

  private initInteractions_(): void {
    fromEvent<MapBrowserEvent<any>>(this.map, 'pointermove')
      .pipe(switchMap((event) => from(this.layer.getFeatures(event.pixel))))
      .subscribe((features) => {
        const target = this.map.getTarget() as HTMLElement
        if (features.length > 0) {
          target.style.cursor = 'pointer'
          this.hoverStation = features[0]
          this.layer.changed()
        } else {
          if (this.hoverStation) {
            target.style.cursor = ''
            this.hoverStation = null
            this.layer.changed()
          }
        }
      })

    this.map.on('click', (event) => {
      const hit = this.map.forEachFeatureAtPixel(
        event.pixel,
        (feature: Feature) => {
          return feature
        },
        { layerFilter: (layer) => layer === this.getLayer() }
      )
      if (hit) {
        this.stationFacade.selectStation(hit.getId() as number)
      }
    })
  }

  public getLayer(): VectorLayer<VectorSource> {
    return this.layer
  }

  public getExtent(): Extent {
    return this.layer.getExtent()
  }

  public clear(): void {
    this.source.clear()
  }

  stationStyleFn(feature: Feature): Style | Style[] {
    const level = feature
      .get('levels')
      .find((value) => value.date === this.currentDate)?.level

    return stationStyleFn(
      level,
      !!(this.hoverStation && feature === this.hoverStation)
    )
  }
}
