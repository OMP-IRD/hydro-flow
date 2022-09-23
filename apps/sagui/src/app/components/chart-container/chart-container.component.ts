import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import {
  ChartMapper,
  StationDataFacade,
  StationsFacade,
} from '@hydro-flow/feature/hydro'
import { Subscription } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { SaguiFacade } from '../../+state/sagui.facade'
import {
  ChartDataModel,
  Reference,
  SaguiStationDataResponse,
} from '../../services/sagui.chart.mapper'
import { ChartSerieType } from '../serie-selector/serie-selector.component'

declare let Chart: any
declare let bootstrap: any

@Component({
  selector: 'hyfaa-chart-container',
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
  series: ChartSerieType[]
  currentSerie: ChartSerieType
  chartData: ChartDataModel
  references

  constructor(
    public dataFacade: StationDataFacade,
    public stationsFacade: StationsFacade,
    public hyfaaFacade: SaguiFacade,
    private chartMapper: ChartMapper
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
      this.dataFacade.loaded$
        .pipe(filter((loaded) => !loaded))
        .subscribe((loaded) => {
          if (this.chart) {
            this.chart.destroy()
          }
        })
    )

    this.subscription.add(
      this.stationsFacade.selectedStations$.subscribe((station) =>
        station ? this.bsModal.show() : this.bsModal.hide()
      )
    )

    this.subscription.add(
      this.dataFacade.stationData$
        .pipe(
          filter((response: SaguiStationDataResponse) => !!response),
          tap(
            (response: SaguiStationDataResponse) =>
              (this.references = response.data.references)
          ),
          tap(
            (response: SaguiStationDataResponse) =>
              (this.series = response.data.references.map((ref) => ({
                id: ref.id,
              })))
          ),
          tap(() => (this.currentSerie = this.series[0])),
          map((response: SaguiStationDataResponse) =>
            this.chartMapper.toChart(response)
          ),
          tap((chartData) => (this.chartData = chartData))
        )
        .subscribe((chartData) => {
          this.createChart(chartData)
        })
    )
  }

  createChart(chartData: ChartDataModel) {
    const tooltipKeys = []
    this.chart = new Chart({
      renderTo: this.chartElt.nativeElement,
      y_title: 'Flow (m³/sec)',
      x_title: 'Date',
      drawCircles: false,
    })
      .read(chartData)
      .draw()
    this.chart.addSerie(
      {
        data: chartData.forecast,
        name: 'forecast',
        type: 'line',
        className: 'forecast-line',
      },
      chartData.forecast_dates
    )

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
    const reference: Reference = this.references.find(
      (ref) => ref.id === this.currentSerie.id
    )
    this.chart.addSerie(
      {
        data: reference.data.map((ref) => ref.flow),
        name: 'expected',
        type: 'line',
        className: 'expected-line',
      },
      reference.data.map((ref) => ref.date)
    )
    tooltipKeys.push({ key: 'expected', title: 'Référence' })

    this.chart.scaleYDomain()
    this.chart.scaleXDomain()
    this.chart.addControl()
    this.chart.redrawSeries()
    this.chart.addTooltip(tooltipKeys)
  }

  onDataSerieChange(serieType: string): void {
    this.currentSerie = this.series.find((serie) => serie.id === serieType)
    this.chart.destroy()
    this.createChart(this.chartData)
  }

  close() {
    this.chart?.destroy()
    this.stationsFacade.selectStation(undefined)
  }
}
