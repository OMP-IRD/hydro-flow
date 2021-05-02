import { FeatureCollection } from 'geojson'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'

export const readFeatureCollection = (
  featureCollection: FeatureCollection,
  featureProjection = 'EPSG:3857',
  dataProjection = 'EPSG:4326'
): Feature[] => {
  const olFeatures = new GeoJSON().readFeatures(featureCollection, {
    featureProjection,
    dataProjection,
  })
  return olFeatures
}
