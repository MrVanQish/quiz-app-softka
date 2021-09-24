import { Component, OnInit } from '@angular/core';
import { ResultsQuestions, Questions } from 'src/app/models/questions';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public questionsArray: Array<Questions> | undefined;
  public acc = 1;
  public questionsNumMax = 0;
  public points = 0;

  public arrayPositionRandom = []

  constructor(private questions: QuestionsService, private router: Router, public modal: NgbModal) {}

  ngOnInit(): void {
    this.questions
      .getQuestions()
      .subscribe((x) =>  ( this.questionsArray = x.results, 
        this.questionsNumMax = this.questionsArray?.length));
  }

/*   public onNextQuestion() {
    if (this.acc === this.questionsArray?.length) {
      console.log('falta agregar funcionalidad');
    } else {
      this.acc++;
    }

    console.log(this.questionsArray)
  }  */


  public onAnswer(e : any){

      if(e === this.questionsArray?.[0]?.correct_answer){

        this.questionsArray?.shift();
        this.acc++;

        this.points += 10;

        this.acc === this.questionsNumMax + 1 ? this.router.navigate(['/home']) : console.log(this.questionsArray)

      }else{
        this.router.navigate(['/home']);
      }

      
  }

}
