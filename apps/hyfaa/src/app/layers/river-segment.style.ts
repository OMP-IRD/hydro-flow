import { Style as GSStyle } from 'geostyler-style'

export const RIVER_SEGMENT_STYLE_GS: GSStyle = {
  name: 'QGIS Style',
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
