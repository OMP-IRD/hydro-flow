import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SaguiTab } from '../ui/ui.model'
import { DashboardItemModel } from './api.model'

const BASE_PATH = '/api/v1'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  dashboard(): Observable<DashboardItemModel[]> {
    return this.http.get<DashboardItemModel[]>(`${BASE_PATH}/dashboard.json`)
  }
  stations(tab: SaguiTab): Observable<DashboardItemModel[]> {
    return this.http.get<DashboardItemModel[]>(
      `${BASE_PATH}/${tab}/stations.json`
    )
  }
  stationData(
    tab: SaguiTab,
    stationId: number
  ): Observable<DashboardItemModel[]> {
    return this.http.get<DashboardItemModel[]>(
      `${BASE_PATH}/${tab}/stations/${stationId}/data.json`
    )
  }
}
