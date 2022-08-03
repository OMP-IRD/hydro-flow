export const SAGUI_TAB_TYPES = [
  'flow_previ',
  'flow_alerts',
  'rain_alerts',
  'atmo_alerts',
] as const

export type SaguiTab = typeof SAGUI_TAB_TYPES[number]

export interface TabModel {
  key: SaguiTab
  title: string
  icon: string
  color?: string
}
