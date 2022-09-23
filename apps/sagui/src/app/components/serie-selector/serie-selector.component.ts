import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { HyfaaDataSerie } from '@hydro-flow/feature/hydro'

export interface ChartSerieType {
  label?: string
  id: string
}

@Component({
  selector: 'sagui-serie-selector',
  templateUrl: './serie-selector.component.html',
  styleUrls: ['./serie-selector.component.scss'],
})
export class SerieSelectorComponent implements OnInit {
  @Input() serieType: string
  @Input() series: ChartSerieType[]
  @Output() serieChange = new EventEmitter<string>()
  current: ChartSerieType

  setCurrent(serie: ChartSerieType): void {
    this.current = serie
    this.serieChange.emit(this.current.id)
  }

  getLabel(serie: ChartSerieType): string {
    return serie.label || serie.id
  }

  ngOnInit(): void {
    this.current = this.series.find((serie) => serie.id === this.serieType)
  }
}
