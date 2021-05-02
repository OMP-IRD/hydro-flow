export type HyfaaDataSerie = 'all' | 'assimilated' | 'mgbstandard' | 'forecast'

export type StationDataModel = any

export interface LoadStationDataOptionsModel {
  dataSerie?: HyfaaDataSerie
}
