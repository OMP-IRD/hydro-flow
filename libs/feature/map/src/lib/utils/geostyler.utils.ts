import { LegendRule } from '@hydro-flow/ui/map'
import { Style as GSStyle, BaseSymbolizer } from 'geostyler-style'

export const geostylerToLegend = (style: GSStyle): LegendRule[] => {
  return style.rules.map((rule) => {
    return {
      label: rule.name,
      color: (rule.symbolizers[0] as BaseSymbolizer).color,
    }
  })
}
