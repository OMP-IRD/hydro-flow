import { Circle, Fill, Icon, Style } from 'ol/style'
import { alertCodeToColor, alertCodeToIcon } from '../ui/ui.utils'

export type LevelType = 'n' | 'd1' | 'd2' | 'd3' | 'f1' | 'f2' | 'f3'

export function stationStyleFn(level: LevelType): Style[] {
  if (level === undefined) return

  return [
    new Style({
      image: new Circle({
        radius: 20,
        fill: new Fill({
          color: alertCodeToColor(level),
        }),
      }),
    }),
    new Style({
      image: new Icon({
        src: alertCodeToIcon(level),
        scale: [0.2, 0.2],
      }),
    }),
  ]
}
