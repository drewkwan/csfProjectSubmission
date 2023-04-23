import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Category, Question, User } from 'src/app/models';
import { TriviaService } from 'src/app/services/trivia.service';
import { TriviaResultComponent } from './trivia-result.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {
  
  categories: Category[] = [
    {value: 'arts_and_literature', viewValue: 'Arts & Literature'},
    {value: 'film_and_tv', viewValue: 'Film & TV'},
    {value: 'history', viewValue: 'History'},
    {value: 'general_knowledge', viewValue: 'General Knowledge'},
    {value: 'Science', viewValue: 'Science'},
    {value: 'sports_and_leisure', viewValue: 'Sports & Leisure'},
    {value: 'society_and_culture', viewValue: 'Society & Culture'},
    {value: 'music', viewValue: 'Music'},
    {value: 'food_and_drink', viewValue: 'Food & Drink'},
    {value: 'geography', viewValue: 'Geography'}
  ];

  currUser!: User;
  quiz!: Question[];
  score: number = 0;
  highscore!: number;
  questionList: string[] = [];
  randomQuestionList: string[] = [];
  checked: boolean = false;
  completed: boolean = false;
  displayScore: boolean=false;
  username:string = "drew";

  form!: FormGroup;
  currentQuestion: number = 0;

  category!: string;

  triviaSubscription$!: Subscription;

  constructor(private fb: FormBuilder, private triviaSvc: TriviaService, private router: Router, private dialog: MatDialog, private userSvc: UserService) {}
  
  ngOnInit() {
    this.form = this.createForm();
    this.currUser = JSON.parse(localStorage.getItem("userData")!);
    const username = this.currUser.sub;
    this.triviaSvc.getTriviaHighscore(username).then(response=> {
      this.highscore = response.highscore;
    })
  }

  createForm() {
    return this.fb.group({
      category: this.fb.control('', [Validators.required]),
      difficulty: this.fb.control('', [Validators.required])
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
    this.questionList.push(this.quiz[this.currentQuestion].correctAnswer);
    this.questionList.push(this.quiz[this.currentQuestion].incorrectAnswers[0]);
    this.questionList.push(this.quiz[this.currentQuestion].incorrectAnswers[1]);
    this.questionList.push(this.quiz[this.currentQuestion].incorrectAnswers[2]);
    // console.log("ordered answers", this.questionList);
    //take answers and add them to random list
    this.transferToRandom();
    this.transferToRandom();
    this.transferToRandom();
    this.transferToRandom();
    // console.log("random answers", this.randomQuestionList);
    console.log("for debugging, correct answer: " + this.quiz[this.currentQuestion].correctAnswer);
    
  }

  getTrivia() {
    console.log(this.form.value)
    const category = this.form.get('category')?.value;
    const difficulty = this.form.get('difficulty')?.value;
    this.triviaSvc.getTriviaQuestions(category, difficulty).then(response=> {
      this.quiz = response;
      console.log(this.quiz);
      this.randomiseQuestions();
    }).catch(err=> {
      console.error(err);
    })
  }




  submitAnswer(answer: string) {
    
    if (answer == this.quiz[this.currentQuestion].correctAnswer) {
      //proceed to next question
      
      console.log("Success" + answer);
      if (this.quiz[this.currentQuestion].difficulty == "easy") {
        this.score = this.score + 1;
        this.currentQuestion = this.currentQuestion + 1; 
        this.checked= false;
        if (this.currentQuestion >= this.quiz.length) {
          this.completed=true
          this.currUser = JSON.parse(localStorage.getItem("userData")!);
          const username = this.currUser.sub;
          this.category= this.form.get('category')?.value
          console.log(this.category, username, this.score, this.highscore)
          //get current highscore
            if (this.score > this.highscore) {
              this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
                console.log(response)
              });
              this.highscore = this.score;
              this.openAlertDialog(this.score, this.highscore)
            } else {
              this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
                console.log(response)
            })
            this.openAlertDialog(this.score, this.highscore);
          };
          
        } else {
          this.randomiseQuestions();
        }
        
      } else if (this.quiz[this.currentQuestion].difficulty == "medium") {
        this.score = this.score + 2;
        this.currentQuestion = this.currentQuestion +1;
        this.checked= false;
        if (this.currentQuestion >= this.quiz.length) {
          this.completed=true
          this.currUser = JSON.parse(localStorage.getItem("userData")!);
          const username = this.currUser.sub;
          this.category= this.form.get('category')?.value
          console.log(this.category, username, this.score, this.highscore)
          //get current highscore
            if (this.score > this.highscore) {
              this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
                console.log(response)
              });
              this.highscore = this.score;
              this.openAlertDialog(this.score, this.highscore)
            } else {
              this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
                console.log(response)
            })
            this.openAlertDialog(this.score, this.highscore);
          };
          
        } else {
          this.randomiseQuestions();
        }
        
        
      } else if (this.quiz[this.currentQuestion].difficulty == "hard") {
        this.score = this.score + 3;
        this.currentQuestion = this.currentQuestion +1;
        this.checked= false;
        if (this.currentQuestion >= this.quiz.length) {
          this.completed=true;
          this.currUser = JSON.parse(localStorage.getItem("userData")!);
        const username = this.currUser.sub;
        this.category= this.form.get('category')?.value
        console.log(this.category, username, this.score, this.highscore)
        //get current highscore
          if (this.score > this.highscore) {
            this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
              console.log(response)
            });
            this.highscore = this.score;
            this.openAlertDialog(this.score, this.highscore)
          } else {
            this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
              console.log(response)
          })
          this.openAlertDialog(this.score, this.highscore);
        };
          
        } else {
          this.randomiseQuestions();
        }
        
        
      }
      
    } else {
      
      //game over
      this.currUser = JSON.parse(localStorage.getItem("userData")!);
        const username = this.currUser.sub;
        this.category= this.form.get('category')?.value
        console.log(this.category, username, this.score, this.highscore)
        //get current highscore
          if (this.score > this.highscore) {
            this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
              console.log(response)
            });
            this.highscore = this.score;
            this.openAlertDialog(this.score, this.highscore)
          } else {
            this.triviaSvc.saveHighscore(this.score, username, this.category).then(response=>{
              console.log(response)
          })
          this.openAlertDialog(this.score, this.highscore);
        };
          
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
