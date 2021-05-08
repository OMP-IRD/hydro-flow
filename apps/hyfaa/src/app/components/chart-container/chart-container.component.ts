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
  HyfaaDataSerie,
  StationDataFacade,
  StationsFacade,
} from '@hydro-flow/feature/hydro'
import { Subscription } from 'rxjs'
import { filter, map, mergeMap, take } from 'rxjs/operators'
import { HyfaaFacade } from '../../+state/hyfaa.facade'
import { initialState } from '../../+state/hyfaa.reducer'

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
    public hyfaaFacade: HyfaaFacade,
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
          mergeMap((stationData) =>
            this.hyfaaFacade.dataSerie$.pipe(
              take(1),
              map((dataSerie) =>
                this.chartMapper.toChart(stationData, dataSerie)
              )
            )
          )
        )
        .subscribe((chartData) => {
          const tooltipKeys = []
          if (this.chart) {
            this.chart.destroy()
          }
          this.chart = new Chart({
            renderTo: this.chartElt.nativeElement,
            y_title: 'Flow',
            x_title: 'Date',
            drawCircles: false,
          })
            .read(chartData)
            .draw()
            .addControl()
          if (chartData.variance?.length > 0) {
            const range = chartData.h.reduce(
              (output, waterHeight, index) => {
                const variance = chartData.variance[index]
                output.top.push(waterHeight + variance)
                output.bottom.push(waterHeight - variance)
                return output
              },
              { top: [], bottom: [] }
            )
            this.chart.addSerie(
              {
                ...range,
                name: 'variance',
                type: 'range',
                className: 'variance-area',
              },
              chartData.dates
            )
            tooltipKeys.push('variance')
          }
          if (chartData.expected?.length > 0) {
            this.chart.addSerie(
              {
                data: chartData.expected,
                name: 'expected',
                type: 'line',
                className: 'expected-line',
              },
              chartData.dates
            )
            tooltipKeys.push('expected')
          }
          this.chart.addTooltip(tooltipKeys)
        })
    )
  }

  onDataSerieChange(serieType: HyfaaDataSerie): void {
    this.hyfaaFacade.setDataSerie(serieType)
  }

  close() {
    this.chart.destroy()
    this.stationsFacade.selectStation(undefined)
  }
}
