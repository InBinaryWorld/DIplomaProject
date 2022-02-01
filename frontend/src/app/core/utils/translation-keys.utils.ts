import { ReservationStatus } from '../../base/models/dto/reservation-status.model';
import { Role } from '../../base/models/dto/role.model';
import { RequestStatus } from '../../base/models/dto/request-status.model';
import { ThesisStatus } from '../../base/models/dto/topic-status.model';

export class TranslationKeys {

  public static forThesisStatus(status: ThesisStatus): string {
    return 'ThesisStatus.' + status;
  }

  public static forReservationStatus(status: ReservationStatus): string {
    return 'ReservationsStatus.' + status;
  }

  public static forRequestStatus(status: RequestStatus): string {
    return 'RequestStatus.' + status;
  }

  public static forRole(role: Role): string {
    return 'Role.' + role;
  }

}
