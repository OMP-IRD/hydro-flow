import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'hydro-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.scss'],
})
export class ChartModalComponent implements OnInit, OnChanges {
  @Input() data: any
  @ViewChild('graph') graph: ElementRef
  chart: any

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      console.log('data changes')
    }
  }

  ngOnInit(): void {}
}
