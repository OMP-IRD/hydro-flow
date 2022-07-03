import { Component } from '@angular/core'
import { CellsLayer } from '../../layers/cells.layer'

@Component({
  selector: 'raincell-cell-legend',
  templateUrl: './cell-legend.component.html',
  styleUrls: ['./cell-legend.component.scss'],
})
export class CellLegendComponent {
  legendSpec = {
    title: 'Cells',
    rules: [
      {
        label: '0 - 50',
        color: '#0149FF',
      },
      {
        label: '50 - 100',
        color: '#019B90',
      },
      {
        label: '100 - 250',
        color: '#02EE20',
      },
      {
        label: '250 - 500',
        color: '#76FD08',
      },
      {
        label: '500 - 1000',
        color: '#FFFF00',
      },
      {
        label: '1000 - 2500',
        color: '#FEBD00',
      },
      {
        label: '2500 - 5000',
        color: '#FD7A00',
      },
      {
        label: '5000 - 10000',
        color: '#FE3D02',
      },
      {
        label: '10000 - 22260',
        color: '#FF0105',
      },
    ],
  }
  constructor(private cellsLayer: CellsLayer) {}

  onCellsVisibilityToggle(visible: boolean): void {
    this.cellsLayer.getLayer().setVisible(visible)
  }
  get cellsVisibility(): boolean {
    return this.cellsLayer.getLayer().getVisible()
  }
}
