import { SaguiTab } from '../ui/ui.model'

export interface DashboardItemModel {
  id: SaguiTab
  alert_code: string
  attributes: Record<string, number>
}
