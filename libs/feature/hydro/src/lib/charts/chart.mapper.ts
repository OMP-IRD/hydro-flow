import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ChartMapper {
  toChart(apiData: any): any {
    let chartData = apiData.data.mgbstandard.reduce(
      (output, input) => {
        output.dates.push(input.date)
        output.h.push(input.flow_mean)
        return output
      },
      { dates: [], h: [] }
    )
    chartData = {
      dates: chartData.dates.reverse(),
      h: chartData.h.reverse(),
    }
    return chartData
  }
}
