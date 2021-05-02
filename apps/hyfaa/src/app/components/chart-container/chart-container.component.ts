import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  ChartMapper,
  StationDataFacade,
  StationsFacade,
} from '@hydro-flow/feature/hydro'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

declare var Chart: any
declare var bootstrap: any

@Component({
  selector: 'hyfaa-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
})
export class ChartContainerComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartElt') chartElt: ElementRef
  @ViewChild('chartModal') chartModal: ElementRef
  bsModal: any
  chart: any
  subscription = new Subscription()

  constructor(
    public dataFacade: StationDataFacade,
    public stationsFacade: StationsFacade,
    private chartMapper: ChartMapper
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.chart.destroy()
    this.subscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.bsModal = new bootstrap.Modal(this.chartModal.nativeElement, {
      backdrop: 'static',
      keyboard: false,
    })

    this.subscription.add(
      this.stationsFacade.selectedStations$.subscribe((station) =>
        station ? this.bsModal.show() : this.bsModal.hide()
      )
    )

    this.subscription.add(
      this.dataFacade.stationData$
        .pipe(
          filter((data) => !!data),
          map((stationData) => this.chartMapper.toChart(stationData))
        )
        .subscribe((chartData) => {
          this.chart = new Chart({
            renderTo: this.chartElt.nativeElement,
            y_title: 'Flow',
            x_title: 'Date',
          })
            .read(chartData)
            .draw()
            .addControl()
        })
    )
  }

  close() {
    this.chart.destroy()
    this.stationsFacade.selectStation(undefined)
  }
}
