import { Component, OnInit } from '@angular/core';
import { ResultsQuestions, Questions } from 'src/app/models/questions';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public questionsArray: Array<Questions> = [];
  public acc = 1;
  public questionsNumMax = 0;
  public points = 0;
  public arrayAux: Array<String> = [];
  public scores: Array<Score> = [];
  public loading: boolean = false;

  constructor(
    private questions: QuestionsService,
    private router: Router,
    private dbService: DbService
  ) {}

  ngOnInit(): void {
    this.questions
      .getQuestions()
      .subscribe(
        (x) => (
          (this.questionsArray = x.results),
          (this.questionsNumMax = this.questionsArray.length),
          this.answersRandom()
        )
      );
  }

  public onCorrectAnswer(e: any, answer: any) {
    if (answer === this.questionsArray[0].correct_answer) {
      setTimeout(() => {
        e.target.checked = false;

        this.questionsArray.shift();

        if (this.questionsArray.length !== 0) {
          this.answersRandom();

          this.acc++;

          this.points += 10;
        } else {
          this.points += 10;

          alert('WOW! You won');

          const nickname = prompt('Please enter your nickname', '');

          this.saveDataWinnerOrLoser(String(nickname));

          this.router.navigate(['/home']);
        }
      }, 700);
    } else {
      setTimeout(() => {
        alert('WRONGGGGG! Has perdido');

        const nickname = prompt('Please enter your nickname', '');

        this.saveDataWinnerOrLoser(String(nickname));

        this.router.navigate(['/home']);
      }, 500);
    }
  }

  public leaveAndSaveProgress() {
    const nickname = prompt('Please enter your nickname', '');

    const playerInfo = new Score(
      this.points,
      String(nickname),
      this.points / 10
    );

    this.dbService.addScore(playerInfo).subscribe();
  }

  public saveDataWinnerOrLoser(name: string) {
    if (this.points <= 40) {
      const playerInfo = new Score(0, name, 0);

      this.dbService.addScore(playerInfo).subscribe();
    } else {
      const playerInfo = new Score(this.points, name, this.points / 10);

      this.dbService.addScore(playerInfo).subscribe();
    }
  }

  public answersRandom() {
    const answerErrors = this.questionsArray[0].incorrect_answers;
    const answerCorrect = String(this.questionsArray[0].correct_answer);

    answerErrors.push(answerCorrect);

    this.arrayAux = this.shuffle(answerErrors);
  }

  public shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
