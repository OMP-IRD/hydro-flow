import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
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
}
