import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TriviaService } from 'src/app/services/trivia.service';
import { TriviaComponent } from './trivia.component';

@Component({
  selector: 'app-trivia-result',
  templateUrl: './trivia-result.component.html',
  styleUrls: ['./trivia-result.component.css']
})
export class TriviaResultComponent {

  score: string = ""
  highscore: string= ""
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TriviaResultComponent>) {
    if (data) {
      this.score = data.score || this.score;
      this.highscore=data.highscore || this.highscore;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
