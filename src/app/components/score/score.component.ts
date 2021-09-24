
import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  public scores: Array<Score> = [];

  constructor(private dbService: DbService) {
  }

  
  ngOnInit(): void {
    this.dbService.getScores().subscribe(data => this.scores = data);
  }

  

}
