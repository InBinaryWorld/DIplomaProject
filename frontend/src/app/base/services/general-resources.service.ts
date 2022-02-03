import { Injectable } from '@angular/core';
import { GeneralResourcesStateKey } from '../store/general/general.state';
import { GeneralResourcesStoreService } from './store/general-store.service';
import { IdType } from '../models/dto/id.model';
import { Observable } from 'rxjs';
import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Timetable } from '../models/dto/timetable.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesService {

  private publicKey = 'PUBLIC';


  constructor(private readonly generalResourcesStoreService: GeneralResourcesStoreService) {
  }

  public invalidateAllGeneralResources(): void {
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.FIELDS_OF_STUDY);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DEPARTMENTS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DIPLOMA_SESSIONS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.TIMETABLES);
  }

  public getTimetableForId(id: IdType, ifNeededOnly = true): Observable<Timetable> {
    return this.generalResourcesStoreService.getTimetableForId(id, ifNeededOnly);
  }

  getDiplomaSessionForId(id: IdType): Observable<DiplomaSession> {
    return this.generalResourcesStoreService.getDiplomaSessionForId(id);
  }


}
