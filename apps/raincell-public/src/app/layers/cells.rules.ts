import { StyleRules } from '@hydro-flow/ui/map'

export const CELLS_RULES: StyleRules[] = [
  {
    label: '0 - 5',
    filter: ['&&', ['>=', 'width', 0], ['<', 'width', 5]],
    color: '#0149FF',
  },
  {
    label: '5 - 10',
    filter: ['&&', ['>=', 'width', 5], ['<', 'width', 10]],
    color: '#019B90',
  },
  {
    label: '10 - 20',
    filter: ['&&', ['>=', 'width', 10], ['<', 'width', 20]],
    color: '#02EE20',
  },
  {
    label: '20 - 30',
    filter: ['&&', ['>=', 'width', 20], ['<', 'width', 30]],
    color: '#76FD08',
  },
  {
    label: '30 - 50',
    filter: ['&&', ['>=', 'width', 30], ['<', 'width', 50]],
    color: '#FFFF00',
  },
  {
    label: '50 - 70',
    filter: ['&&', ['>=', 'width', 50], ['<', 'width', 70]],
    color: '#FEBD00',
  },
  {
    label: '70 - 100',
    filter: ['&&', ['>=', 'width', 70], ['<', 'width', 100]],
    color: '#FD7A00',
  },
  {
    label: '100 - 150',
    filter: ['&&', ['>=', 'width', 100], ['<', 'width', 150]],
    color: '#FE3D02',
  },
  {
    label: '> 150',
    filter: ['&&', ['>=', 'width', 150], ['<', 'width', 500000]],
    color: '#FF0105',
  },
]
