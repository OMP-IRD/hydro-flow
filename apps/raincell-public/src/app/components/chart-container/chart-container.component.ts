import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { CellsChartMapper, CellsFacade } from '@hydro-flow/feature/hydro'
import { Subscription } from 'rxjs'
import { filter, map, withLatestFrom } from 'rxjs/operators'

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

    this.subscription.add(
      this.cellsFacade.loaded$
        .pipe(filter((loaded) => !loaded))
        .subscribe((loaded) => {
          if (this.chart) {
            this.chart.destroy()
          }
        })
    )

    this.subscription.add(
      this.cellsFacade.feature$.subscribe((cell) =>
        cell ? this.bsModal.show() : this.bsModal.hide()
      )
    )

    this.subscription.add(
      this.cellsFacade.feature$
        .pipe(
          filter((cell) => !!cell),
          map((cell) => this.chartMapper.toChart(cell)),
          withLatestFrom(this.cellsFacade.frequence$)
        )
        .subscribe(([chartData, freq]) => {
          const tooltipKeys = []
          const inputFormat =
            freq === 'min' ? { inputFormat: '%Y-%m-%dT%H:%M' } : {}
          this.chart = new Chart({
            renderTo: this.chartElt.nativeElement,
            y_title: 'Rain (mm)',
            x_title: 'Date',
            dataLabelFn: (value) => `rain: ${value} mm`,
            drawCircles: false,
            ...inputFormat,
            outputFormat: '%Y-%m-%d %I:%M:%p',
            roundValues: false,
          })
            .read(chartData)
            .draw()

          this.chart.addSerie(
            {
              bottom: chartData.q25,
              top: chartData.q75,
              name: 'variance',
              type: 'range',
              className: 'variance-area',
            },
            chartData.dates
          )
          tooltipKeys.push({ key: 'variance' })

          this.chart.scaleYDomain()
          this.chart.scaleXDomain()
          this.chart.addControl()
          this.chart.redrawSeries()
          this.chart.addTooltip(tooltipKeys)
        })
    )
  }

  onFrequenceChange($event: any) {
    this.cellsFacade.setFrequence($event)
  }

  close() {
    this.chart.destroy()
    this.cellsFacade.reset()
  }
}
