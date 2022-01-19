import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { LecturerTopicsComponent } from "./components/topics/lecturer-topics.component";
import { LecturerComponent } from "./components/lecturer/lecturer.component";
import { LecturerTopicReviewComponent } from "./components/topics/review/lecturer-topic-review.component";
import { LecturerTopicManageComponent } from "./components/topics/manage/lecturer-topic-manage.component";
import { LecturerTopicCreateComponent } from "./components/topics/create/lecturer-topic-create.component";
import { LecturerTopicCorrectComponent } from "./components/topics/correct/lecturer-topic-correct.component";
import { LecturerReservationsComponent } from "./components/reservations/lecturer-reservations.component";
import {
  LecturerReservationsManageComponent
} from "./components/reservations/manage/lecturer-reservations-manage.component";


const routes: Routes = [
  {
    path: 'lecturer',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.LECTURER] },
    component: LecturerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'topic',
      },
      {
        path: 'topic',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: LecturerTopicsComponent,
          },
          {
            path: 'create',
            component: LecturerTopicCreateComponent,
          },
          {
            path: 'manage/:id',
            component: LecturerTopicManageComponent,
          },
          {
            path: 'review/:id',
            component: LecturerTopicReviewComponent,
          },
          {
            path: 'correct/:id',
            component: LecturerTopicCorrectComponent,
          }
        ]
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: LecturerReservationsComponent,
          },
          {
            path: ':id',
            component: LecturerReservationsManageComponent,
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturerRoutingModule {
}
