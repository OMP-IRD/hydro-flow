import { Circle, Fill, Icon, Style } from 'ol/style'
import { alertCodeToColor, alertCodeToIcon } from '../ui/ui.utils'

export type LevelType = 'n' | 'd1' | 'd2' | 'd3' | 'f1' | 'f2' | 'f3'

const stylesCache = {}

export function stationStyleFn(level: LevelType, hover: boolean): Style[] {
  if (level === undefined) return

  const colorCacheKey = (level[1] || '0') + (hover ? '_h' : '')
  const iconCacheKey = level[0] + (hover ? '_h' : '')
  const zIndex = hover ? 10 : 1
  const radius = hover ? 24 : 20
  const scale = hover ? 0.24 : 0.2

  if (!stylesCache[colorCacheKey]) {
    stylesCache[colorCacheKey] = new Style({
      zIndex,
      image: new Circle({
        radius: hover ? 24 : 20,
        fill: new Fill({
          color: alertCodeToColor(level),
        }),
      }),
    })
  }
  if (!stylesCache[iconCacheKey]) {
    stylesCache[iconCacheKey] = new Style({
      zIndex,
      image: new Icon({
        src: alertCodeToIcon(level),
        scale: [scale, scale],
      }),
    })
  }

  return [stylesCache[colorCacheKey], stylesCache[iconCacheKey]]
}
