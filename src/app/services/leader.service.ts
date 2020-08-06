import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { of, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders').pipe(
      catchError(this.processHTTPMsgService.handleError)
    );
    //return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string) : Observable<Leader> {
    return this.http.get<Leader>(baseURL+"leaders/"+id).pipe(
      catchError(this.processHTTPMsgService.handleError)
    );
    //return of(LEADERS.filter((leader : Leader) => (leader.id === id))[0]).pipe(delay(2000));
  }

  getFeatured(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL+"leaders?featured=true")
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(LEADERS.filter((leader : Leader) => (leader.featured === true))[0]).pipe(delay(2000));
  }
}
