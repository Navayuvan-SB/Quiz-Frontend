export interface Question {
  category: string;
  type: boolean;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options?: string[];
}

export interface Quiz {
  _id: string;
  questions: Question[];
  createdBy: string;
  difficulty: string;
  type: string;
  categoryId: string;
  categoryName: string;
  name: string;
  createdAt: string;
}

export interface Result {
  _id?: string;
  userId?: string;
  noOfCorrectAnswers: number;
  noOfWrongAnswers: number;
  noOfTotalQuestions: number;
  timeTaken: string;
  quizId: string;
  quizName: string;
  createdAt?: string;
}
