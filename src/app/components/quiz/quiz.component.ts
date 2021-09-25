import { set } from 'firebase/database';
import { Component, OnInit } from '@angular/core';
import { ResultsQuestions, Questions } from 'src/app/models/questions';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  public screenNickname : boolean = false;

  constructor(
    private questions: QuestionsService,
    private router: Router,
    public modal: NgbModal,
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

  /*   public onNextQuestion() {
    if (this.acc === this.questionsArray?.length) {
      console.log('falta agregar funcionalidad');
    } else {
      this.acc++;
    }

    console.log(this.questionsArray)
  }  */

  public onCorrectAnswer(e: any, answer: any) {
    if (answer === this.questionsArray[0].correct_answer) {
      
      setTimeout(() => {
        e.target.checked = false;

        this.questionsArray.shift();

        if (this.questionsArray.length !== 0) {
          this.answersRandom();

          this.acc++;

          this.points += 10;

          this.acc === this.questionsNumMax + 1
            ? this.router.navigate(['/home'])
            : console.log(this.questionsArray);

           
            console.log(this.scores);

        } else {

          this.screenNickname = true;

          this.points += 10;
          this.acc === this.questionsNumMax + 1;

          this.saveDataWinnerOrLoser('winner')
          
          setTimeout(() => {

            this.router.navigate(['/home']);

          }, 7000);

          
        }
      }, 700);
    } else {

      this.screenNickname = true;

      this.saveDataWinnerOrLoser('loser')

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 7000);
    }
  }

  public saveDataWinnerOrLoser(name: string){

    if(this.points < 50){

      const playerInfo = new Score(0, name, 0);

      this.dbService.addScore(playerInfo).subscribe();

    }else{

      const playerInfo = new Score(this.points, name, this.points / 10);

      this.dbService.addScore(playerInfo).subscribe();

    }
   

  }


  public answersRandom() {
    const answerErrors = this.questionsArray[0].incorrect_answers;
    const answerCorrect = String(this.questionsArray[0].correct_answer);

    answerErrors.push(answerCorrect);

    this.arrayAux = this.shuffle(answerErrors);

    console.log(answerCorrect);
    console.log(this.questionsArray);

  /*   console.log(this.arrayAux); */
  }

  public shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
