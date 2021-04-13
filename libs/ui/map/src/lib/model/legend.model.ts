export interface LegendRule {
  color: string
  label: string
}
export interface LegendSpec {
  title?: string
  description?: string
  rules: LegendRule[]
}
