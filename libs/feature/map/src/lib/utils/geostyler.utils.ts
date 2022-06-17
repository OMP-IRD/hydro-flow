import { LegendRule } from '@hydro-flow/ui/map'
import {
  Style as GSStyle,
  BaseSymbolizer,
  Operator,
  Filter,
} from 'geostyler-style'

export const geostylerToLegend = (style: GSStyle): LegendRule[] => {
  return style.rules.map((rule) => {
    return {
      label: rule.name,
      color: (rule.symbolizers[0] as BaseSymbolizer).color,
    }
  })
}

export const matchFilter = (value: any, filter: Filter): boolean => {
  const operatorMapping = {
    '&&': true,
    '||': true,
    '!': true,
  }

  let matchesFilter = true
  const operator: Operator = filter[0]
  let isNestedFilter = false
  if (operatorMapping[operator]) {
    isNestedFilter = true
  }
  try {
    if (isNestedFilter) {
      let intermediate = true
      switch (filter[0]) {
        case '&&':
          filter.slice(1).forEach((f: Filter) => {
            if (!matchFilter(value, f)) {
              intermediate = false
            }
          })
          matchesFilter = intermediate
          break
        case '||':
          filter.slice(1).forEach((f: Filter) => {
            if (matchFilter(value, f)) {
              intermediate = true
            }
          })
          matchesFilter = intermediate
          break
        case '!':
          matchesFilter = !matchFilter(value, filter[1])
          break
        default:
          throw new Error(
            'Cannot parse Filter. Unknown combination or negation operator.'
          )
      }
    } else {
      const prop: any = value
      switch (filter[0]) {
        case '==':
          matchesFilter = '' + prop === '' + filter[2]
          break
        case '*=':
          if (typeof filter[2] === 'string' && typeof prop === 'string') {
            if (filter[2].length > prop.length) {
              matchesFilter = false
            } else {
              matchesFilter = prop.indexOf(filter[2]) !== -1
            }
          }
          break
        case '!=':
          matchesFilter = '' + prop !== '' + filter[2]
          break
        case '<':
          matchesFilter = parseFloat(prop) < Number(filter[2])
          break
        case '<=':
          matchesFilter = parseFloat(prop) <= Number(filter[2])
          break
        case '>':
          matchesFilter = parseFloat(prop) > Number(filter[2])
          break
        case '>=':
          matchesFilter = parseFloat(prop) >= Number(filter[2])
          break
        default:
          throw new Error('Cannot parse Filter. Unknown comparison operator.')
      }
    }
  } catch (e) {
    throw new Error('Cannot parse Filter. Invalid structure.')
  }
  return matchesFilter
}
