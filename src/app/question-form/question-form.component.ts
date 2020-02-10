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
  serverErrorMessage: string;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.categories = [];
    this.question = new Question('', '', '', '');
    this.questionService.getQuestionCategories().subscribe(data => {
      this.categories = data;
      this.serverErrorMessage = '';
    },
      error => this.serverErrorMessage = error
    );
  }

  onSubmit() {
    this.questionService.addQuestion(this.question).subscribe(() => {
      this.question = new Question('', '', '', '');
      this.serverErrorMessage = '';
    },
      error => this.serverErrorMessage = error
    );
  }

}
