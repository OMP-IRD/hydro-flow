export const SAGUI_TABS = [
  'forecast_flow',
  'alert_flow',
  'alert_rain',
  'alert_atmo',
] as const
export type SaguiTab = typeof SAGUI_TABS[number]
