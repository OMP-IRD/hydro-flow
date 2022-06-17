import { Injectable } from '@angular/core'
import { HyfaaDataSerie } from '../stations/+state'

@Injectable({
  providedIn: 'root',
})
export class ChartMapper {
  toChart(apiData: any, dataSerie: HyfaaDataSerie = 'all'): any {
    return apiData.data[dataSerie].reverse().reduce(
      (output, input) => {
        output.dates.push(input.date)
        output.h.push(input.flow)
        if (input.flow_mad !== undefined) {
          output.variance.push(input.flow_mad)
        }
        if (input.expected !== undefined) {
          output.expected.push(input.expected)
        }
        return output
      },
      { dates: [], h: [], variance: [], expected: [] }
    )
  }
}
