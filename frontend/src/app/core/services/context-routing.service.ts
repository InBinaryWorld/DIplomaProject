import { Injectable } from '@angular/core';
import { SessionStoreService } from "../../modules/login/services/session-store.service";
import { first } from "rxjs/operators";
import { UserRole } from "../../modules/login/models/user-role.model";
import { Router } from "@angular/router";
import { Role } from "../models/role.model";
import { Dictionary } from "../models/dictionary.model";
import { isNotNil } from "../base/isNotNil";


@Injectable({
  providedIn: 'root'
})
export class ContextRoutingService {

  private loginRoute = '/login';
  private routeByRole: Dictionary<string> = {
    [Role.DEAN]: '/dean',
    [Role.ADMIN]: '/admin',
    [Role.STUDENT]: '/student',
    [Role.LECTURER]: '/lecturer',
    [Role.COORDINATOR]: '/coordinator',
    [Role.DIPLOMA_SECTION_MEMBER]: '/diploma-section',
    [Role.PROGRAM_COMMITTEE_MEMBER]: '/program-committee'
  }

  constructor(private readonly sessionStoreService: SessionStoreService,
              private readonly router: Router) {
  }

  public navigateToPageByContext(): void {
    this.sessionStoreService.getContextRole()
      .pipe(first())
      .subscribe(role => this.handleRole(role))
  }

  private handleRole(role?: UserRole): void {
    if (isNotNil(role)) {
      const routeByRole = this.routeByRole[role!.role];
      if (isNotNil(routeByRole)) {
        this.router.navigate([routeByRole]).then();
        return;
      }
    }
    this.router.navigate([this.loginRoute]).then();
  }
}
