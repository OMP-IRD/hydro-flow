import { Style as GSStyle } from 'geostyler-style/dist/style'

// 0,5,10,20,30,50,70,90,120,150, >150

export const CellsRules: GSStyle = {
  name: 'Cells',
  rules: [
    {
      name: '0 - 5',
      filter: ['&&', ['>=', 'width', 0], ['<=', 'width', 5]],
      symbolizers: [
        {
          kind: 'Fill',
          opacity: 1,
          color: '#0149FF',
        },
      ],
    },
    {
      name: '5 - 10',
      filter: ['&&', ['>=', 'width', 5], ['<=', 'width', 10]],
      symbolizers: [
        {
          kind: 'Fill',
          opacity: 1,
          color: '#ff0000',
        },
      ],
    },
  ],
}
