import { NgModule } from '@angular/core';

import { ProgramCommitteeRoutingModule } from "./program-committee-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProgramCommitteeTopicsComponent } from "./components/topics/program-committee-topics.component";
import { ProgramCommitteeComponent } from "./components/program-committee/program-committee.component";


@NgModule({
  declarations: [
    ProgramCommitteeComponent,
    ProgramCommitteeTopicsComponent
  ],
  imports: [
    SharedModule,
    ProgramCommitteeRoutingModule,
  ]
})
export class ProgramCommitteeModule {
}