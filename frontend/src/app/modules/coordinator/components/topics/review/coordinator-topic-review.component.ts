import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from "../../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../../shared/dto/topic-status.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-coordinator-topic-review',
  templateUrl: './coordinator-topic-review.component.html',
  styleUrls: ['./coordinator-topic-review.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicReviewComponent implements OnInit {

  form?: FormGroup;

  topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    personCount: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    fillingDate: new Date()
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/coordinator/topic'])
  }

  reject() {
    this.router.navigate(['/coordinator/topic'])
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      thesisTopic: this.topic.name,
      supervisor: "Jan kowalski",
      personCount: this.topic.personCount,
      description: this.topic.description
    })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      thesisTopic: [],
      supervisor: [],
      personCount: [],
      description: [],
    })
  }

}
