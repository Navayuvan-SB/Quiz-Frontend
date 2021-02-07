import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/quiz.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  // Result data
  // Result Members
  result: Result = {
    noOfCorrectAnswers: 0,
    noOfTotalQuestions: 10,
    noOfWrongAnswers: 0,
    quizId: '',
    timeTaken: '',
    quizName: '',
  };
  constructor(
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch the result data
    this.getResult();
  }

  // Get Result data from localstorage if exist or hit a API
  private async getResult(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id');

      const localstorageData: Result = JSON.parse(localStorage.getItem(id));

      if (localstorageData) {
        this.result = localstorageData;
      } else {
        this.api.getAResult(id).subscribe((data) => {
          this.result = data as Result;
        });
      }
    });
  }

  navToHome(): void {
    this.router.navigate(['home']);
  }
}
