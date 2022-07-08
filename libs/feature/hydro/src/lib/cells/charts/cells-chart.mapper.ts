import { Injectable } from '@angular/core'
import { Feature } from 'ol'

@Injectable({
  providedIn: 'root',
})
export class CellsChartMapper {
  toChart(cell: Feature): any {
    const rcData = cell.get('rc_data')
    return rcData.reduce(
      (chartConfig, day) => {
        let dayDates
        let dayQ50
        let dayQ25
        let dayQ75
        if (day.v) {
          dayDates = day.v.map(
            (dayValue) =>
              `${day.d.substring(0, 4)}-${day.d.substring(
                4,
                6
              )}-${day.d.substring(6, 8)}T${dayValue.t.substring(
                0,
                2
              )}:${dayValue.t.substring(2, 4)}`
          )
          dayQ50 = day.v.map((dayValue) => dayValue.q50)
          dayQ25 = day.v.map((dayValue) => dayValue.q25)
          dayQ75 = day.v.map((dayValue) => dayValue.q75)
        } else {
          dayDates = [day.d]
          dayQ50 = [day.q50]
          dayQ25 = [day.q25]
          dayQ75 = [day.q75]
        }
        return {
          dates: [...chartConfig.dates, ...dayDates],
          h: [...chartConfig.h, ...dayQ50],
          q25: [...chartConfig.q25, ...dayQ25],
          q75: [...chartConfig.q75, ...dayQ75],
        }
      },
      { dates: [], h: [], q25: [], q75: [] }
    )
  }
}
