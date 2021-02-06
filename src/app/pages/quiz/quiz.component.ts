import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  // Timer instance
  timer: any;
  timeInDisplay: string = '00:00';

  constructor() {}

  ngOnInit(): void {
    this.startTimer();
  }

  // Start the timer
  startTimer(): void {
    let timeInSeconds: number = 0;
    this.timer = setInterval(() => {
      timeInSeconds++;
      this.timeInDisplay = this.convertToDisplayFormat(timeInSeconds);
    }, 1000);
  }

  // Stop the timer
  stopTimer() {
    clearInterval(this.timer);
  }

  // Convert seconds to display format
  convertToDisplayFormat(seconds: number): string {
    var min = Math.floor(seconds / 60);
    var sec = seconds - min * 60;

    const minConverted = min < 10 ? `0${min}` : String(min);
    const secConverted = sec < 10 ? `0${sec}` : String(sec);

    return `${minConverted}:${secConverted}`;
  }
}
