import { Filter } from 'geostyler-style/dist/style'

export interface LegendRule {
  color: string
  label: string
}
export interface LegendSpec {
  title?: string
  description?: string
  rules: LegendRule[]
}

export interface StyleRules extends LegendRule {
  filter?: Filter
}
