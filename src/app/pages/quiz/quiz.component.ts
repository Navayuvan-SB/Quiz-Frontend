import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Quiz, Result } from 'src/app/models/quiz.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  // Timer instance
  timer: any;
  timeInDisplay = '00:00';

  // Quiz Members
  quiz: Quiz;
  activeQuestionIndex = -1;
  aciveQuestionObject: Question;
  isAnswered = 0; // 0 - unanswered, 1 - correctly answered, 2 - wrongly answered

  // Answer group
  selectedValue: string = null;
  confirmedSelectedValue: string = null;

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
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Start the timer
    this.startTimer();

    // Get Quiz Data
    this.getQuiz();
  }

  // Get Quiz meta data from localstorage if exist or hit a API
  private async getQuiz(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id');

      const localstorageData: Quiz = JSON.parse(localStorage.getItem(id));

      if (localstorageData) {
        this.quiz = localstorageData;
        this.nextQuestion();
      } else {
        this.api.getAQuiz(id).subscribe((data) => {
          this.quiz = data as Quiz;
          this.nextQuestion();
        });
      }
    });
  }

  // Increment the Question
  nextQuestion(): void {
    this.confirmedSelectedValue = this.selectedValue;
    const question = this.quiz.questions[++this.activeQuestionIndex];
    const optionsArray = [];
    optionsArray.push(question.correct_answer);
    question.incorrect_answers.forEach((answers) => {
      optionsArray.push(answers);
    });

    // Shuffle the options
    question.options = this.shuffleArray(optionsArray);

    // Reset the answer group
    this.selectedValue = null;

    // Assign it to active question object
    this.aciveQuestionObject = question;

    // Reset the answered flag
    this.isAnswered = 0;
  }

  // Answer choosed
  answerChoosed(answer: any): void | boolean {
    if (this.isAnswered !== 0) {
      this.selectedValue = this.confirmedSelectedValue;
    }

    if (answer.value === this.aciveQuestionObject.correct_answer) {
      this.result.noOfCorrectAnswers++;
      this.isAnswered = 1;
    } else {
      this.result.noOfWrongAnswers++;
      this.isAnswered = 2;

      const answerdElement = document.getElementById(answer.source.id);
      answerdElement.classList.add('wrong');
    }
  }

  // Submit the quiz
  submitQuiz(): void {
    // save the time taken
    this.result.timeTaken = this.timeInDisplay;

    // Save the user id
    const user = this.auth.getTokendata() as User;
    this.result.userId = user.id;

    // Save the Quiz details
    this.result.quizId = this.quiz._id;
    this.result.quizName = this.quiz.name;

    // Stop the timer
    this.stopTimer();

    // Store the result
    this.api.saveResult(this.result).subscribe((data: Result) => {
      localStorage.setItem(data._id, JSON.stringify(data));
      this.router.navigate(['result', data._id]);
    });
  }

  // Suffle the options
  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // Start the timer
  startTimer(): void {
    let timeInSeconds = 0;
    this.timer = setInterval(() => {
      timeInSeconds++;
      this.timeInDisplay = this.convertToDisplayFormat(timeInSeconds);
    }, 1000);
  }

  // Stop the timer
  stopTimer(): void {
    clearInterval(this.timer);
  }

  // Convert seconds to display format
  convertToDisplayFormat(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds - min * 60;

    const minConverted = min < 10 ? `0${min}` : String(min);
    const secConverted = sec < 10 ? `0${sec}` : String(sec);

    return `${minConverted}:${secConverted}`;
  }
}
