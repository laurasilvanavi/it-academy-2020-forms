import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  categories: string[];

  constructor() { }

  ngOnInit() {
    this.categories = ['Shipping', 'Refund', 'Membership', 'Other'];
  }

}
