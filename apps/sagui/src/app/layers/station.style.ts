import { Icon, Style } from 'ol/style'

export type LevelType = 'n' | 'd1' | 'd2' | 'd3' | 'f1' | 'f2' | 'f3'
function getIconPath(level: LevelType) {
  return `assets/stations/${level}.png`
}

export function stationStyleFn(level: LevelType): Style {
  return new Style({
    image: new Icon({
      src: getIconPath(level),
      scale: [0.15, 0.15],
    }),
  })
}
