import { SaguiTab } from '../ui/ui.model'

export interface DashboardItemModel {
  id: SaguiTab
  alert_code: string
  attributes: Record<string, number>
}
export interface AtmoAlertResultModel {
  date: string
  png: string
  wld: string
  geotiff: string
}
export interface AtmoExtent {
  east: number
  south: number
  west: number
  north: number
}
export interface AtmoAlertModel {
  count: number
  description: string
  classes: string
  legend: string
  extent: AtmoExtent
  results: AtmoAlertResultModel[]
}
