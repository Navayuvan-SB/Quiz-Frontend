import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-quiz-details',
  templateUrl: './admin-quiz-details.component.html',
  styleUrls: ['./admin-quiz-details.component.scss'],
})
export class AdminQuizDetailsComponent implements OnInit {
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch quiz data
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

  // Delete a quiz
  deleteQuiz(): void {
    this.api.deleteAQuiz(this.quiz._id).subscribe((data) => {
      this.router.navigate(['home']);
    });
  }
}
