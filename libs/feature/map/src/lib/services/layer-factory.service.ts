import { Injectable } from '@angular/core'
import Layer from 'ol/layer/Base'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

export enum LayerSpecType {
  XYZ = 'xyz',
  WMS = 'wms',
}
export interface LayerSpec {
  type: 'xyz' | 'wms'
  url: string
  id: string
}

@Injectable({
  providedIn: 'root',
})
export class LayerFactoryService {
  create(spec: LayerSpec): Layer {
    const { type, url } = spec
    switch (type) {
      case LayerSpecType.XYZ:
        return new TileLayer({
          source: new XYZ({
            url,
          }),
        })
    }
  }
}
