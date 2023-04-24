import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomQuestion } from 'src/app/models';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-trivia-create',
  templateUrl: './trivia-create.component.html',
  styleUrls: ['./trivia-create.component.css']
})
export class TriviaCreateComponent implements OnInit {

  id!: string;
  form!: FormGroup;
  incorrectAnswers: string[] =[];
  loading: boolean = false;
  customQuestion: CustomQuestion ={
    correctAnswer: '',
    incorrectAnswers: [],
    question: ''
  };

  constructor(private fb: FormBuilder, private triviaSvc: TriviaService, private router:Router){  }

  ngOnInit(): void {
      this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control(this.id, [Validators.required]),
      question: this.fb.control('', [Validators.required]),
      correctAnswer: this.fb.control('', [Validators.required]),
      incorrectAnswer1: this.fb.control('', Validators.required),
      incorrectAnswer2: this.fb.control('', Validators.required),
      incorrectAnswer3: this.fb.control('', Validators.required),

    })
    
  }

  submitQuestion() {
    // console.log(this.form.value);
    this.loading=true;
    this.incorrectAnswers.push(this.form.get("incorrectAnswer1")?.value);
    this.incorrectAnswers.push(this.form.get("incorrectAnswer2")?.value);
    this.incorrectAnswers.push(this.form.get("incorrectAnswer3")?.value);
    // console.log(this.form.get("id")?.value);
    this.id=this.form.get("id")?.value;
    this.customQuestion.question = this.form.get("question")?.value.toString();
    this.customQuestion.correctAnswer=this.form.get("correctAnswer")?.value;
    this.customQuestion.incorrectAnswers=this.incorrectAnswers;
    // console.log(this.customQuestion);

    //call the service and post to conrtroller
    this.triviaSvc.insertCustomTriviaQuestion(this.customQuestion, this.id).then(response => {
      console.log(response);
      this.loading = false;
      alert(`Question added successfully added for ${this.id}`)
    }).catch(err=> {
      this.loading=false
      alert("Question could not be added!")
      console.error(err);
    })
    // this.ngOnInit();
    this.form.reset();
  }

  

}
