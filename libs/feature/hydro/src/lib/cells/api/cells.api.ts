import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FeatureCollection } from 'geojson'
import { Observable } from 'rxjs'
import { RainAtTimeAndCellRequestModel } from './cells.model'

//https://raincell.pigeo.fr/features/functions/postgisftw.rain_at_time_and_cell/items.json?cell_ident=0922750019140000
const BASE_PATH = '/features/functions'
@Injectable({
  providedIn: 'root',
})
export class CellsApi {
  constructor(private http: HttpClient) {}
  getRainAtTimeAndCell(
    params: RainAtTimeAndCellRequestModel
  ): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(
      `${BASE_PATH}/postgisftw.rain_at_time_and_cell/items.json`,
      {
        params,
      }
    )
  }
  getRainDailyAtTimeAndCell(
    params: RainAtTimeAndCellRequestModel
  ): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(
      `${BASE_PATH}/postgisftw.rain_daily_at_date_and_cell/items.json`,
      {
        params,
      }
    )
  }
}
