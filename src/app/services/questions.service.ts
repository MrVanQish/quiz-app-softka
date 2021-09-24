import { Injectable } from '@angular/core';
import { ResultsQuestions } from '../models/questions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable <ResultsQuestions>{

    return this.http.get<ResultsQuestions>('https://opentdb.com/api.php?amount=5&type=multiple');

  }


}
