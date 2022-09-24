import { Injectable } from '@angular/core'

interface SaguiStationDataItem {
  source: string
  date: string
  flow: number
  flow_mad?: number
}
export interface Reference {
  id: string
  data: SaguiStationDataItem[]
}

interface Threshold {
  threshold_drought?: number
  threshold_flood_high?: number
  threshold_flood_low?: number
  threshold_flood_mid?: number
}
export interface SaguiStationDataResponse {
  id: number
  minibasin: number
  city: string
  data: {
    flow: SaguiStationDataItem[]
    forecast: SaguiStationDataItem[]
    references: Reference[]
  }
  thresholds?: Threshold[]
}

export interface ChartDataModel {
  h: number[]
  forecast: number[]
  variance: number[]
  dates: string[]
  forecast_dates: string[]
  thresholds?: Threshold[]
}

@Injectable()
export class SaguiChartMapper {
  toChart(response: SaguiStationDataResponse): ChartDataModel {
    const dates = [
      ...response.data.flow.map((item) => item.date),
      ...response.data.forecast.map((item) => item.date),
    ]
    const flow = [
      ...response.data.flow.map((item) => item.flow),
      ...response.data.forecast.map((item) => item.flow),
    ]
    const variance = [
      ...response.data.flow.map(() => 0),
      ...response.data.forecast.map((item) => item.flow_mad),
    ]
    const { thresholds } = response
    return {
      dates,
      forecast_dates: response.data.forecast.map((item) => item.date),
      h: flow,
      forecast: response.data.forecast.map((item) => item.flow),
      variance,
      ...(thresholds ? { thresholds } : {}),
    }
  }
}
