import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { HyfaaDataSerie } from '@hydro-flow/feature/hydro'

interface SerieType {
  label?: string
  value: HyfaaDataSerie
}

@Component({
  selector: 'hyfaa-serie-selector',
  templateUrl: './serie-selector.component.html',
  styleUrls: ['./serie-selector.component.scss'],
})
export class SerieSelectorComponent implements OnInit {
  @Input() serieType: HyfaaDataSerie
  @Output() serieChange = new EventEmitter<HyfaaDataSerie>()
  series: SerieType[] = [
    {
      label: 'MGB Standard',
      value: 'mgbstandard',
    },
    {
      value: 'assimilated',
    },
    {
      value: 'forecast',
    },
  ]
  current: SerieType

  setCurrent(serie: SerieType): void {
    this.current = serie
    this.serieChange.emit(this.current.value)
  }

  getLabel(serie: SerieType): string {
    return serie.label || serie.value
  }

  ngOnInit(): void {
    this.current = this.series.find((serie) => serie.value === this.serieType)
  }
}
