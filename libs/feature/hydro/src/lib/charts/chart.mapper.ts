import { Injectable } from '@angular/core'
import { HyfaaDataSerie } from '@hydro-flow/feature/hydro'

@Injectable({
  providedIn: 'root',
})
export class ChartMapper {
  toChart(apiData: any, dataSerie: HyfaaDataSerie = 'all'): any {
    return apiData.data[dataSerie].reverse().reduce(
      (output, input) => {
        output.dates.push(input.date)
        output.h.push(input.flow)
        if(input.flow_mad) {
          output.variance.push(input.flow_mad)
        }
        if(input.expected) {
          output.expected.push(input.expected)
        }
        return output
      },
      { dates: [], h: [], variance: [], expected: [] }
    )
  }
}
