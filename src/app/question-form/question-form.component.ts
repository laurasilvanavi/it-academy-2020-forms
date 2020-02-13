import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { forbiddenNameValidator } from '../shared/forbidden-name-directive';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  // questionForm = new FormGroup({
  //   senderName: new FormControl(''),
  //   senderEmail: new FormControl(''),
  //   category: new FormControl(''),
  //   details: new FormControl(''),
  // });
  questionForm = this.fb.group({
    senderName: ['', [
      Validators.required,
      Validators.maxLength(30),
      forbiddenNameValidator(/Laura/i)
    ]],
    senderEmail: ['', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]],
    category: ['', Validators.required],
    details: ['Details', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30)
    ]],
  });

  constructor(private questionService: QuestionService, private fb: FormBuilder) { }

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
    this.question = this.questionForm.value;
    this.questionService.addQuestion(this.question).subscribe(() => {
      this.question = new Question('', '', '', '');
      this.serverErrorMessage = '';
    },
      error => this.serverErrorMessage = error
    );
  }

  get senderName() { return this.questionForm.get('senderName'); }
  get senderEmail() { return this.questionForm.get('senderEmail'); }
  get category() { return this.questionForm.get('category'); }
  get details() { return this.questionForm.get('details'); }
}
