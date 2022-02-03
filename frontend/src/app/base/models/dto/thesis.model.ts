import { ThesisStatus } from './topic-status.model';
import { IdType, WithId } from './id.model';

export interface Thesis extends WithId {
  supervisorId: IdType;
  diplomaSessionId: IdType;
  authorStudentId?: IdType;
  topic: string;
  description: string;
  numberOfStudents: number;
  status: ThesisStatus;
  coordinatorComment?: string;
  submissionDate: Date;
  reportedByStudent: boolean;
}
