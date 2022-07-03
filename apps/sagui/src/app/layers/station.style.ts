import Feature from 'ol/Feature'
import { Icon, Style } from 'ol/style'

export type LevelType = 'n' | 'd1' | 'd2' | 'd3' | 'f1' | 'f2' | 'f3'
function getIconPath(level: LevelType) {
  return `assets/stations/${level}.png`
}

export function stationStyleFn(feature: Feature, resolution: number): Style {
  const level: LevelType = feature.get('level')
  return new Style({
    image: new Icon({
      src: getIconPath(level),
    }),
  })
}
