import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateQuizComponent } from '../create-quiz/create-quiz.component';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { Quiz } from 'src/app/models/quiz.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // if user is admin
  isAdmin = false;

  // All Quiz
  quizzes: Quiz[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    // Check the user type
    this.checkUser();

    // Get the quiz data
    this.getQuizData();
  }

  // Check the user type
  async checkUser(): Promise<void> {
    const user: User = (await this.auth.getTokendata()) as User;
    if (user.role === 'admin') {
      this.isAdmin = true;
    }
  }

  // Get the quiz data
  async getQuizData(): Promise<void> {
    this.api.getAllQuiz().subscribe((data) => {
      this.quizzes = data as Quiz[];
    });
  }

  // Navigate to quiz details
  navToQuizDetails(quiz: Quiz): void {
    localStorage.setItem(quiz._id, JSON.stringify(quiz));
    if (this.isAdmin) {
      this.router.navigate(['admin-quiz-detail', quiz._id]);
    } else {
      this.router.navigate(['quiz-detail', quiz._id]);
    }
  }

  // Open the create quiz dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateQuizComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.quizzes.push(result);
    });
  }

  // Logout the user
  logout(): void {
    this.auth.removeToken();
    this.router.navigate(['login']);
  }
}
