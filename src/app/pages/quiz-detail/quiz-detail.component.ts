import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss'],
})
export class QuizDetailComponent implements OnInit {
  // Quiz data
  quiz: Quiz;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    // Get quiz meta data
    this.getQuiz();
  }

  // Get Quiz meta data from localstorage if exist or hit a API
  private async getQuiz(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id');

      const localstorageData: Quiz = JSON.parse(localStorage.getItem(id));

      if (localstorageData) {
        this.quiz = localstorageData;
      } else {
        this.api.getAQuiz(id).subscribe((data) => {
          this.quiz = data as Quiz;
        });
      }
    });
  }

  // Navigate to quiz questions
  navToQuiz(): void {
    this.router.navigate(['quiz', this.quiz._id]);
  }
}
