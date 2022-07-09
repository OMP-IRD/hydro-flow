import { Component } from '@angular/core'
import { CellsLayer } from '../../layers/cells.layer'
import { CELLS_RULES } from '../../layers/cells.rules'

@Component({
  selector: 'raincell-cell-legend',
  templateUrl: './cell-legend.component.html',
  styleUrls: ['./cell-legend.component.scss'],
})
export class CellLegendComponent {
  legendSpec = {
    title: 'Rain in mm',
    rules: CELLS_RULES,
  }
  constructor(private cellsLayer: CellsLayer) {}

  onCellsVisibilityToggle(visible: boolean): void {
    this.cellsLayer.getLayer().setVisible(visible)
  }
  get cellsVisibility(): boolean {
    return this.cellsLayer.getLayer().getVisible()
  }
}
