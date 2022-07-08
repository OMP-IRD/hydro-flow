import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { CellsChartMapper, CellsFacade } from '@hydro-flow/feature/hydro'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

declare let Chart: any
declare let bootstrap: any

@Component({
  selector: 'raincell-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
})
export class ChartContainerComponent implements OnDestroy, AfterViewInit {
  @ViewChild('chartElt') chartElt: ElementRef
  @ViewChild('chartModal') chartModal: ElementRef
  bsModal: any
  chart: any
  chartHeight = 500
  get chartHeightStyle(): string {
    return `${this.chartHeight}px`
  }
  subscription = new Subscription()

  constructor(
    public cellsFacade: CellsFacade,
    private chartMapper: CellsChartMapper
  ) {}

  ngOnDestroy() {
    this.chart.destroy()
    this.subscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.bsModal = new bootstrap.Modal(this.chartModal.nativeElement, {
      backdrop: 'static',
      keyboard: false,
    })

    /*
    this.subscription.add(
      this.cellsFacade.loaded$
        .pipe(filter((loaded) => !loaded))
        .subscribe((loaded) => {
          if (this.chart) {
            this.chart.destroy()
          }
        })
    )
*/

    this.subscription.add(
      this.cellsFacade.feature$.subscribe((cell) =>
        cell ? this.bsModal.show() : this.bsModal.hide()
      )
    )

    this.subscription.add(
      this.cellsFacade.feature$
        .pipe(
          filter((cell) => !!cell),
          map((cell) => this.chartMapper.toChart(cell))
        )
        .subscribe((chartData) => {
          console.log(chartData)
          const tooltipKeys = []
          this.chart = new Chart({
            renderTo: this.chartElt.nativeElement,
            y_title: 'Flow (m³/sec)',
            x_title: 'Date',
            drawCircles: false,
          })
            .read(chartData)
            .draw()
          if (chartData.dataSerie === 'forecast') {
            const todayIndex =
              chartData.dates.filter((date) => new Date(date) < new Date())
                .length - 1
            this.chart.addSerie(
              {
                data: chartData.h.slice(todayIndex),
                name: 'forecast',
                type: 'line',
                className: 'forecast-line',
              },
              chartData.dates.slice(todayIndex)
            )
          }
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
            tooltipKeys.push({ key: 'variance' })
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
            tooltipKeys.push({ key: 'expected', title: 'History' })
          }
          this.chart.scaleYDomain()
          this.chart.scaleXDomain()
          this.chart.addControl()
          this.chart.redrawSeries()
          this.chart.addTooltip(tooltipKeys)
        })
    )
  }

  onDataSerieChange(serieType): void {}

  close() {
    this.chart.destroy()
    // this.stationsFacade.selectStation(undefined)
  }
}
