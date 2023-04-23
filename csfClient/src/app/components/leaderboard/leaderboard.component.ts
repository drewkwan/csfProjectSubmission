import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Score } from 'src/app/models';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  @ViewChild('paginator') 
  paginator!: MatPaginator;

  score!: Score;
  scores: Score[]=[];
  dataSource= new MatTableDataSource(this.scores);
  dataSourceWithPageSize = new MatTableDataSource(this.scores);
  pageIndex=0;
  pageSize=10;

  constructor(private triviaService: TriviaService) {

  }

  ngOnInit() {
    this.triviaService.getAllHighscores().subscribe(response=> {
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
      this.dataSource.paginator = this.paginator;
      
  
    })
  }

  displayedColumns: string[] =['Ranking', 'Name', 'Score', 'Category'];

  setUpGrid() {
  }

  handlePageEvent(e: PageEvent) {
    this.paginator.pageSize = e.pageSize;
    this.paginator.pageIndex = e.pageIndex;
  }

  header() {
    return "header";
  }

  ranking(rank:number) {
    console.log(rank);
    if (rank=1) {
      return "gold"
    }
    if (rank=2) {
      return "silver"
    }
    if (rank=3) {
      return "bronze"
    }
    return null;
  }





}
