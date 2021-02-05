import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss'],
})
export class QuizDetailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Navigate to quiz questions
  navToQuiz(): void {
    this.router.navigate(['quiz']);
  }
}
