import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  score!: Score;
  scores: Score[]=[];
  dataSource!: Score[];

  constructor(private triviaService: TriviaService) {

  }

  ngOnInit() {
    this.triviaService.getAllHighscores().then(response=> {
      for (let i=0; i<response.length;i++) {
        this.score = {
          username: response[i].username,
          category: response[i].category,
          score: response[i].score,
          ranking: i+1
        }
        this.scores.push(this.score);
      }
      console.log(this.scores)
      this.setUpGrid()
    }).catch(err => {
      console.error(err);
    })
  }

  displayedColumns: string[] =['Ranking', 'Name', 'Score', 'Category'];

  setUpGrid() {
    this.dataSource=this.scores;
  }





}
