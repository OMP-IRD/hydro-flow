import Feature from 'ol/Feature'
import { Fill, Stroke, Style } from 'ol/style'

export interface CellDate {
  date: string
  time: string
}
export function cellsStyleFn(cellDate: CellDate) {
  return (feature: Feature, resolution: number) => {
    const value = JSON.parse(feature.get('rc_data'))
      .find((days) => days.d === cellDate.date)
      .v.find((hours) => hours.t === cellDate.time).v

    const color = value < 2 ? 'red' : 'blue'
    const style = new Style({
      stroke: new Stroke({
        color,
        width: 2,
      }),
      fill: new Fill({
        color,
      }),
    })
    return style
  }
}
