import { StyleRules } from '@hydro-flow/ui/map'

export const BASSIN_RULES: StyleRules[] = [
  {
    label: '0 - 5',
    filter: ['&&', ['>=', 'rain', 0], ['<', 'rain', 5]],
    color: '#3d70be',
  },
  {
    label: '5 - 20',
    filter: ['&&', ['>=', 'rain', 5], ['<', 'rain', 20]],
    color: '#81B29A',
  },
  {
    label: '20 - 50',
    filter: ['&&', ['>=', 'rain', 20], ['<', 'rain', 50]],
    color: '#F2CC8F',
  },
  {
    label: '> 50',
    filter: ['&&', ['>=', 'rain', 50], ['<', 'rain', 500000]],
    color: '#E07A5F',
  },
]
