import { HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { Style as GSStyle } from 'geostyler-style'

export const RIVER_SEGMENT_STYLE_GS_WIDTH: GSStyle = {
  name: 'Basic style',
  rules: [
    {
      name: '1 - 100',
      filter: ['&&', ['>=', 'width', 0], ['<', 'width', 100]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#013CFF',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 1,
        },
      ],
    },
    {
      name: '100 - 500',
      filter: ['&&', ['>=', 'width', 100], ['<', 'width', 500]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#013CFF',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2,
        },
      ],
    },
    {
      name: '500 - 1000',
      filter: ['&&', ['>=', 'width', 500], ['<', 'width', 1000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#013CFF',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 3,
        },
      ],
    },
    {
      name: '1000 - 2000',
      filter: ['&&', ['>=', 'width', 1000], ['<', 'width', 2000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#013CFF',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 4,
        },
      ],
    },
    {
      name: '2000 - 22260',
      filter: ['&&', ['>=', 'width', 2000], ['<=', 'width', 222600]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#013CFF',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 5,
        },
      ],
    },
  ],
}

export const RIVER_SEGMENT_STYLE_GS_VIRIDIS: GSStyle = {
  name: 'Viridis',
  rules: [
    {
      name: '0 - 50',
      filter: ['&&', ['>=', 'width', 0], ['<=', 'width', 50]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#440154',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '50 - 100',
      filter: ['&&', ['>=', 'width', 50], ['<=', 'width', 100]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#462C7B',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '100 - 250',
      filter: ['&&', ['>=', 'width', 100], ['<=', 'width', 250]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#3A528B',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '250 - 500',
      filter: ['&&', ['>=', 'width', 250], ['<=', 'width', 500]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#2B728E',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '500 - 1000',
      filter: ['&&', ['>=', 'width', 500], ['<=', 'width', 1000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#20908D',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '1000 - 2500',
      filter: ['&&', ['>=', 'width', 1000], ['<=', 'width', 2500]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#27AE80',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '2500 - 5000',
      filter: ['&&', ['>=', 'width', 2500], ['<=', 'width', 5000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#5DC962',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '5000 - 10000',
      filter: ['&&', ['>=', 'width', 5000], ['<=', 'width', 10000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#ABDC32',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '10000 - 22260',
      filter: ['&&', ['>=', 'width', 10000], ['<=', 'width', 22260]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FDE725',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
  ],
}

export const RIVER_SEGMENT_STYLE_GS_JET: GSStyle = {
  name: 'Jet Custom',
  rules: [
    {
      name: '0 - 50',
      filter: ['&&', ['>=', 'width', 0], ['<=', 'width', 50]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#0149FF',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '50 - 100',
      filter: ['&&', ['>=', 'width', 50], ['<=', 'width', 100]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#019B90',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '100 - 250',
      filter: ['&&', ['>=', 'width', 100], ['<=', 'width', 250]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#02EE20',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '250 - 500',
      filter: ['&&', ['>=', 'width', 250], ['<=', 'width', 500]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#76FD08',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '500 - 1000',
      filter: ['&&', ['>=', 'width', 500], ['<=', 'width', 1000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FFFF00',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '1000 - 2500',
      filter: ['&&', ['>=', 'width', 1000], ['<=', 'width', 2500]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FEBD00',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '2500 - 5000',
      filter: ['&&', ['>=', 'width', 2500], ['<=', 'width', 5000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FD7A00',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '5000 - 10000',
      filter: ['&&', ['>=', 'width', 5000], ['<=', 'width', 10000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FE3D02',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '10000 - 22260',
      filter: ['&&', ['>=', 'width', 10000], ['<=', 'width', 22260]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FF0105',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
  ],
}

export const RIVER_SEGMENT_STYLE_GS_JET_ANOMALY: GSStyle = {
  name: 'QGIS Style',
  rules: [
    {
      name: '< -100',
      filter: ['<=', 'anomaly', -100],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#440154',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '-100 - -50',
      filter: ['&&', ['>=', 'anomaly', -100], ['<=', 'anomaly', -50]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#462C7B',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '-50 - -25',
      filter: ['&&', ['>=', 'anomaly', -50], ['<=', 'anomaly', -25]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#3A528B',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '-25 - -10',
      filter: ['&&', ['>=', 'anomaly', -25], ['<=', 'anomaly', -10]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#2B728E',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '-10 - 10',
      filter: ['&&', ['>=', 'anomaly', -10], ['<=', 'anomaly', 10]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#20908D',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '10 - 25',
      filter: ['&&', ['>=', 'anomaly', 10], ['<=', 'anomaly', 25]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#27AE80',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '25 - 50',
      filter: ['&&', ['>=', 'anomaly', 25], ['<=', 'anomaly', 50]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#5DC962',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '50 - 100',
      filter: ['&&', ['>=', 'anomaly', 50], ['<=', 'anomaly', 100]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#ABDC32',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
    {
      name: '100 - 1000',
      filter: ['&&', ['>=', 'anomaly', 100], ['<=', 'anomaly', 1000]],
      symbolizers: [
        {
          kind: 'Line',
          opacity: 1,
          color: '#FDE725',
          cap: 'square',
          join: 'bevel',
          dasharray: [5, 2],
          perpendicularOffset: 0,
          width: 2.46,
        },
      ],
    },
  ],
}

export const RIVER_SEGMENT_STYLE_GS_COLOR: {
  [key in HyfaaSegmentFocus]: GSStyle
} = {
  flow: RIVER_SEGMENT_STYLE_GS_JET,
  flow_anomaly: RIVER_SEGMENT_STYLE_GS_JET_ANOMALY,
}
