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
        const dayDates = day.v.map((dayValue) =>
          new Date(
            +day.d.substring(0, 4),
            +day.d.substring(4, 6) - 1,
            +day.d.substring(6, 8),
            +dayValue.t.substring(0, 2),
            +dayValue.t.substring(2, 4)
          ).toISOString()
        )
        const dayQ50 = day.v.map((dayValue) => dayValue.q50)
        /*
        const datesTZ = dayDates.map(
          (date) =>
            new Date(
              date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)
            )
        )
*/
        return {
          dates: [...chartConfig.dates, ...dayDates],
          h: [...chartConfig.h, ...dayQ50],
        }
      },
      { dates: [], h: [] }
    )
  }
}
