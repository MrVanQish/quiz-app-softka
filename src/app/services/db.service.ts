import { Score } from './../models/score';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public ApiURL = 'http://localhost:3000/scores'

  constructor(private http:HttpClient) { }

  public getScores(): Observable <Array<Score>>{

    return this.http.get<Array<Score>>(this.ApiURL);

  }

  public addScore(data: Score): Observable <Score>{

    return this.http.post<Score>(this.ApiURL, {data});

  }

}
