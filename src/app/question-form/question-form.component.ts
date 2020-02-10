import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  providers: [QuestionService]
})
export class QuestionFormComponent implements OnInit {

  categories: string[];
  question: Question;
  questions: Question[];
  serverErrorMessage: string;
  questionCategories: string[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questions = [];
    this.categories = ['Shipping', 'Refund', 'Membership', 'Other'];
    this.question = new Question('', '', '', '');
  }

  onSubmit() {
    this.questions.push(this.question); // local list

    this.questionService.addQuestion(this.question).subscribe(() =>
      this.question = new Question('', '', '', ''));
  }

}
