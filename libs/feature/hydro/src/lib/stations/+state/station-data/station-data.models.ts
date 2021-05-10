export type HyfaaDataSerie = 'all' | 'assimilated' | 'mgbstandard' | 'forecast'

export type HyfaaSegmentFocus = 'flow' | 'flow_anomaly'

export type StationDataModel = any

export interface LoadStationDataOptionsModel {
  dataSerie?: HyfaaDataSerie
}
