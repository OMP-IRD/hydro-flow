import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HyfaaClient {
  constructor(private http: HttpClient) {}

  getStationData(stationId: number): Observable<any> {
    return this.http.get(
      `/api/v1/stations/${stationId}/data/mgbstandard?duration=30%20days`
    )
  }
}
