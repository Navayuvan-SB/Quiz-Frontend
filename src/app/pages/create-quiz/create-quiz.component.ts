import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuizMetaData } from 'src/app/models/quiz.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  creationData: QuizMetaData = {
    categories: [],
    difficulty: [],
    types: [],
    name: '',
  };
  selectedData: QuizMetaData = {
    category: null,
    difficulty: null,
    type: null,
    name: null,
    categoryName: null,
  };
  constructor(
    private api: ApiService,
    private dialog: MatDialogRef<CreateQuizComponent>
  ) {}

  ngOnInit(): void {
    // Fetch Creation Data
    this.getCreationData();
  }

  // Get Creation Data
  getCreationData(): void {
    this.api.getQuizCreationData().subscribe((data) => {
      this.creationData = data as QuizMetaData;
    });
  }

  // Create Quiz
  createQuiz(): void {
    // Extract category name
    this.creationData.categories.forEach((category: any) => {
      if (category.id === this.selectedData.category) {
        this.selectedData.categoryName = category.name;
        return;
      }
    });

    this.api.addQuiz(this.selectedData).subscribe((data) => {
      this.dialog.close(data);
    });
  }
}
