import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateQuizComponent } from '../create-quiz/create-quiz.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  // Navigate to quiz details
  navToQuizDetails() {
    this.router.navigate(['quiz-detail']);
  }

  // Open the create quiz dialog
  openDialog() {
    const dialogRef = this.dialog.open(CreateQuizComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Logout the user
  logout() {
    this.auth.removeToken();
    this.router.navigate(['login']);
  }
}
