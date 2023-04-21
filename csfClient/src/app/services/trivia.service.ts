import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CustomQuestion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) { }

  getTriviaQuestions(category: string, difficulty: string): Promise<any> {

    const params = new HttpParams()
                .set("category", category)
                .set("difficulty", difficulty)
    return lastValueFrom(this.http.get('http://localhost:8080/api/questions', {params: params}))

  }

  insertCustomTriviaQuestion(customQuestion: CustomQuestion, id:string) {
    const body = {
      id: id,
      correctAnswer: customQuestion.correctAnswer,
      incorrectAnswers: customQuestion.incorrectAnswers,
      question: customQuestion.question
    }

    return lastValueFrom(this.http.post('http://localhost:8080/api/postCustom', body));
  }

  getCustomQuiz(quizId:string): Promise<any> {
    return firstValueFrom(this.http.get(`/api/getCustom/${quizId}`));
  }

  getTriviaHighscore(username: string): Promise<any> {
    const params = new HttpParams()
                  .set("username", username);
    return firstValueFrom(this.http.get('http://localhost:8080/api/getTriviaHighscore', {params: params}));

  }

  saveHighscore(score: number, username: string, category:string) {
    const body = {
      highscore: score,
      username: username,
      category: category
    }
    return firstValueFrom(this.http.put('http://localhost:8080/api/updateTriviaHighscore', body));
  }

  getAllHighscores(): Promise<any> {
    return firstValueFrom(this.http.get('http://localhost:8080/api/leaderboard'));
  }

  

}
