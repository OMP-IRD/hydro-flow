import { Extent } from 'ol/extent'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { createDefaultStyle, StyleFunction } from 'ol/style/Style'

export class AbstractFeatureLayer {
  readonly source: VectorSource
  readonly layer: VectorLayer
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

  protected initSource() {}

  public getLayer(): VectorLayer {
    return this.layer
  }

  public getExtent(): Extent {
    return this.layer.getSource().getExtent()
  }

  public clear(): void {
    this.source.clear()
  }
}
