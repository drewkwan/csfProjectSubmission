import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category, CustomQuestion, CustomQuiz, Question } from 'src/app/models';
import { TriviaService } from 'src/app/services/trivia.service';
import { TriviaResultComponent } from './trivia-result.component';

@Component({
  selector: 'app-trivia-custom',
  templateUrl: './trivia-custom.component.html',
  styleUrls: ['./trivia-custom.component.css']
})
export class TriviaCustomComponent implements OnInit {
  

  quiz!: CustomQuiz[];
  customQuiz!: CustomQuestion[];
  score: number = 0;
  questionList: string[] = [];
  randomQuestionList: string[] = [];
  checked: boolean = false;
  completed: boolean = false;


  form!: FormGroup;
  currentQuestion: number = 0;

  constructor(private fb: FormBuilder, private triviaSvc: TriviaService, private router: Router, private dialog: MatDialog) {}
  
  ngOnInit() {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      quizId:this.fb.control('', [Validators.required])
    })
  }


  transferToRandom() {
    const random =Math.floor(Math.random() *this.questionList.length);
    this.randomQuestionList.push(this.questionList[random]);
    this.questionList.splice(random, 1);
  }

  randomiseQuestions() {

    this.questionList =[];
    this.randomQuestionList = [];
    this.questionList.push(this.customQuiz[this.currentQuestion].correctAnswer);
    this.questionList.push(this.customQuiz[this.currentQuestion].incorrectAnswers[0]);
    this.questionList.push(this.customQuiz[this.currentQuestion].incorrectAnswers[1]);
    this.questionList.push(this.customQuiz[this.currentQuestion].incorrectAnswers[2]);
    console.log("ordered answers", this.questionList);
    //take answers and add them to random list
    this.transferToRandom();
    this.transferToRandom();
    this.transferToRandom();
    this.transferToRandom();
    console.log("random answers", this.randomQuestionList);
    console.log("for debugging, correct answer: " + this.customQuiz[this.currentQuestion].correctAnswer);
    
  }

  getCustomTrivia() {
    console.log(this.form.value)
    const quizId =this.form.get("quizId")?.value;
    this.triviaSvc.getCustomQuiz(quizId).then(response=> {
      console.log(response);
      this.quiz = response;
      this.customQuiz=response.questions;
      console.log(this.customQuiz);
      this.randomiseQuestions();
    }).catch(err=> {
      console.error(err);
    })
  }

  isFormInvalid() {
    return this.form.invalid;
  }


  submitAnswer(answer: string) {

    if(answer == this.customQuiz[this.currentQuestion].correctAnswer) {
      this.score = this.score+1;
      this.currentQuestion = this.currentQuestion+1;
      if (this.currentQuestion >= this.customQuiz.length) {
        this.completed=true;
        this.openAlertDialog(this.score, 0);
      } else {
        this.randomiseQuestions();
      }
      
    }
    else {
      //game over
      console.log(this.score);
      this.openAlertDialog(this.score, 0)
    }
    
  }

  openAlertDialog(score:number, highscore:number) {
    const dialogRef = this.dialog.open(TriviaResultComponent,{
      data:{
        score: `Your Score: ${score}`,
        highscore: `Your Highscore: ${highscore}`,
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }
}
