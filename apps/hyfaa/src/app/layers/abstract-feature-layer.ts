import { Extent } from 'ol/extent'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { createDefaultStyle, StyleFunction } from 'ol/style/Style'

export class AbstractFeatureLayer {
  readonly source: VectorSource
  readonly layer: VectorLayer<VectorSource>
  readonly defaultStyle: StyleFunction = createDefaultStyle

  constructor() {
    this.source = new VectorSource({
      wrapX: false,
    })
    this.layer = new VectorLayer({
      source: this.source,
      style: this.defaultStyle,
    })
  }

  public getLayer(): VectorLayer<VectorSource> {
    return this.layer
  }

  public getExtent(): Extent {
    return this.layer.getSource().getExtent()
  }

  public clear(): void {
    this.source.clear()
  }
}
