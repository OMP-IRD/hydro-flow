import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RaincellFrequence } from '../../api/cells.model'

interface FrequenceType {
  label?: string
  value: RaincellFrequence
}

@Component({
  selector: 'hydro-frequence-selector',
  templateUrl: './frequence-selector.component.html',
  styleUrls: ['./frequence-selector.component.scss'],
})
export class FrequenceSelectorComponent implements OnInit {
  @Input() frequenceType: RaincellFrequence
  @Output() frequenceChange = new EventEmitter<RaincellFrequence>()
  frequences: FrequenceType[] = [
    {
      label: 'Values very 15 minutes',
      value: 'min',
    },
    {
      label: 'Daily values',
      value: 'day',
    },
  ]
  current: FrequenceType

  setCurrent(freq: FrequenceType): void {
    this.current = freq
    this.frequenceChange.emit(this.current.value)
  }

  getLabel(serie: FrequenceType): string {
    return serie.label || serie.value
  }

  ngOnInit(): void {
    this.current = this.frequences.find(
      (freq) => freq.value === this.frequenceType
    )
  }
}
