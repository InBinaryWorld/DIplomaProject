import { Role } from '../app/base/models/dto/role.model';
import { AuthData } from '../app/base/models/auth-data.model';
import { User } from '../app/base/models/dto/user-ext.model';
import { ApiLabel } from '../app/core/models/api-route.model';
import { Dictionary } from '../app/core/models/dictionary.model';
import { Thesis } from '../app/base/models/dto/thesis.model';
import { ThesisStatus } from '../app/base/models/dto/topic-status.model';
import { Reservation } from '../app/base/models/dto/reservation.model';
import { ReservationStatus } from '../app/base/models/dto/reservation-status.model';
import { ClarificationRequest } from '../app/base/models/dto/clarification-request.model';
import { RequestStatus } from '../app/base/models/dto/request-status.model';
import { ChangeRequest } from '../app/base/models/dto/change-request.model';
import { Timetable } from '../app/base/models/dto/timetable.model';
import { isNil } from 'lodash-es';
import { DiplomaSession } from '../app/base/models/dto/diploma-session.model';
import { Employee } from '../app/base/models/dto/employee.model';
import { EmployeeRole } from '../app/base/models/dto/employee-role.model';
import { IdType } from '../app/base/models/dto/id.model';
import { UserPerson } from '../app/base/models/dto/user-person.model';
import { FieldOfStudy } from '../app/base/models/dto/field-of-study.model';
import { StudyDegree } from '../app/base/models/dto/study-degree.model';
import { Student } from '../app/base/models/dto/student.model';
import { ReservationMember } from '../app/base/models/dto/reservation-member.model';
import { ReservationMemberStatus } from '../app/base/models/dto/reservation-member-status.model';
import { RequestParams } from '../app/core/models/request-param.model';
import { isNotNil } from '../app/core/tools/is-not-nil';
import { firstItem } from '../app/core/tools/first-item';

const userId: IdType = '1';

const adminId: IdType = '2';
const deanId: IdType = '63';
const studentId: IdType = '1482';
const lecturerId: IdType = '1';
const coordinatorId: IdType = '185';
const dsMemberId: IdType = '140';
const pcMemberId: IdType = '176';

const thesisId: IdType = '7';
const reservationId: IdType = '32';

const departmentId: IdType = '4';
const fieldOfStudyId: IdType = '2';
const fieldOfStudy2Id: IdType = '4';

const timetableId: IdType = '14';
const timetable2Id: IdType = '15';
const timetable3Id: IdType = '16';
const timetable4Id: IdType = '17';
const diplomaSessionId: IdType = '14';
const diplomaSession2Id: IdType = '15';
const diplomaSession3Id: IdType = '16';
const diplomaSession4Id: IdType = '17';


const chRequestId: IdType = '116';
const clRequestId: IdType = '583';


// additional
const student2Id: IdType = '1482';

const deadline = new Date(2022, 1);
const deadline2 = new Date(2023, 1);
const deadline3 = new Date(2022, 1);
const deadline4 = new Date(2023, 1);

const userPerson: UserPerson = {
  id: userId,
  firstName: 'Jack',
  lastName: 'Daniels'
};

const user: User = {
  ...userPerson,
  roles: [
    { id: studentId, role: Role.STUDENT },
    { id: adminId, role: Role.ADMIN },
    { id: deanId, role: Role.DEAN },
    { id: coordinatorId, role: Role.COORDINATOR },
    { id: lecturerId, role: Role.LECTURER },
    { id: dsMemberId, role: Role.DIPLOMA_SECTION_MEMBER },
    { id: pcMemberId, role: Role.PROGRAM_COMMITTEE_MEMBER }
  ]
};

const users: User[] = [user];

function createEmployee(id: IdType, departmentId: IdType, userPerson: UserPerson, role: EmployeeRole, title?: string): Employee {
  return {
    id: id,
    userId: userPerson.id,
    departmentId: departmentId,
    employeeRole: role,
    title: title ?? role,
    user: userPerson
  };
}

const admin = createEmployee(adminId, departmentId, userPerson, EmployeeRole.ADMIN, 'Admin');
const lecturer = createEmployee(lecturerId, departmentId, userPerson, EmployeeRole.LECTURER, 'Lecturer');
const dean = createEmployee(deanId, departmentId, userPerson, EmployeeRole.DEAN, 'Dean');
const coordinator = createEmployee(coordinatorId, departmentId, userPerson, EmployeeRole.COORDINATOR, 'Coordinator');
const committeeMember = createEmployee(pcMemberId, departmentId, userPerson, EmployeeRole.PROGRAM_COMMITTEE_MEMBER, 'Committee member');
const diplomaSectionMember = createEmployee(dsMemberId, departmentId, userPerson, EmployeeRole.DIPLOMA_SECTION_MEMBER, 'Diploma section member');

const employees = [dean, admin, lecturer, coordinator, committeeMember, diplomaSectionMember];


function createFieldOfStudy(id: IdType, departmentId: IdType, dsId: IdType, name: string): FieldOfStudy {
  return {
    id: id,
    departmentId: departmentId,
    activeDiplomaSessionId: dsId,
    degree: StudyDegree.MASTERS,
    name: name
  };
}

const fieldOfStudy: FieldOfStudy = createFieldOfStudy(fieldOfStudyId, departmentId, diplomaSessionId, 'Informatyka Stosowana');
const fieldOfStudy2: FieldOfStudy = createFieldOfStudy(fieldOfStudy2Id, departmentId, diplomaSession2Id, 'Matematyka Stosowana');

const fieldsOfStudy: FieldOfStudy[] = [fieldOfStudy, fieldOfStudy2];


function createTimetable(id: IdType, dsId: IdType, date: Date): Timetable {
  return {
    id: id,
    diplomaSessionId: dsId,
    selectingThesis: date,
    submittingThesis: date,
    changingThesis: date,
    clarificationThesis: date,
    approvingThesisByCommittee: date,
    approvingThesisByCoordinator: date
  };
}

const timetable: Timetable = createTimetable(timetableId, diplomaSessionId, deadline);
const timetable2: Timetable = createTimetable(timetable2Id, diplomaSession2Id, deadline2);
const timetable3: Timetable = createTimetable(timetable3Id, diplomaSession3Id, deadline3);
const timetable4: Timetable = createTimetable(timetable4Id, diplomaSession4Id, deadline4);

const timetables: Timetable[] = [timetable, timetable2, timetable3, timetable4];

function createDiplomaSession(id: IdType, tt: Timetable, fos: FieldOfStudy, year: string): DiplomaSession {
  return {
    id: id,
    timetableId: tt.id,
    timetable: tt,
    fieldOfStudyId: fos.id,
    fieldOfStudy: fos,
    year: year
  };
}

const diplomaSession: DiplomaSession = createDiplomaSession(diplomaSessionId, timetable, fieldOfStudy, '2021/2022');
const diplomaSession2: DiplomaSession = createDiplomaSession(diplomaSession2Id, timetable2, fieldOfStudy, '2022/2023');
const diplomaSession3: DiplomaSession = createDiplomaSession(diplomaSession3Id, timetable3, fieldOfStudy2, '2021/2022');
const diplomaSession4: DiplomaSession = createDiplomaSession(diplomaSession4Id, timetable4, fieldOfStudy2, '2022/2023');

const diplomaSessions: DiplomaSession[] = [
  diplomaSession,
  diplomaSession2,
  diplomaSession3,
  diplomaSession4
];


function createThesis(id: IdType, diplomaSession: DiplomaSession): Thesis {
  const dId = diplomaSession.fieldOfStudy.departmentId;
  const supervisor = employees.find(e => e.departmentId === dId && e.employeeRole === EmployeeRole.LECTURER)!;
  return {
    id: id,
    supervisorId: supervisor.id,
    diplomaSessionId: diplomaSession.id,
    topic: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 3,
    status: ThesisStatus.WAITING,
    reportedByStudent: false,
    submissionDate: new Date(),
    coordinatorComment: 'Całość do poprawy',
    supervisor: supervisor
  };
}

const thesis: Thesis = createThesis(thesisId, diplomaSession);

const theses: Thesis[] = [thesis];

function createStudent(id: IdType, userPerson: UserPerson, fieldOfStudy: FieldOfStudy, idx: string): Student {
  return {
    id: id,
    userId: userPerson.id,
    fieldOfStudyId: fieldOfStudy.id,
    indexNumber: idx,
    fieldOfStudy: fieldOfStudy,
    user: userPerson
  };
}

const student: Student = createStudent(studentId, userPerson, fieldOfStudy, '249013');
const student2: Student = createStudent(student2Id, userPerson, fieldOfStudy, '249041');

const students: Student[] = [student, student2];


function createReservationMember(resMemId: IdType, resId: IdType, student: Student, status: ReservationMemberStatus): ReservationMember {
  return {
    id: resMemId,
    reservationId: resId,
    studentId: student.id,
    student: student,
    status: status
  };
}

function createReservation(resId: IdType, thesis: Thesis, status: ReservationStatus): { reservation: Reservation, resMem: ReservationMember[] } {
  const ds = diplomaSessions.find(ds => ds.id = thesis.diplomaSessionId)!;
  const stud = students.filter(s => s.fieldOfStudyId === ds.fieldOfStudyId).slice(0, thesis.numberOfStudents);
  const resMem = new Array(stud.length).map((_, idx) => {
    const id = resId + idx;
    return createReservationMember(id, resId, stud[idx], ReservationMemberStatus.WILLING);
  });

  const res = {
    id: resId,
    creationDate: new Date(),
    status: status,
    thesisId: thesis.id,
    thesis: thesis,
    reservationMembers: resMem
  };
  return { reservation: res, resMem };
}

const { reservation: reservation1, resMem: reservationMembers1 } =
  createReservation(reservationId, thesis, ReservationStatus.SUBMITTED);

const reservations: Reservation[] = [reservation1];
const reservationMembers: ReservationMember[] = [...reservationMembers1];


function createClRequest(clRequestId: IdType, applicant: Student, thesis: Thesis, deanId: IdType, state: RequestStatus): ClarificationRequest {
  return {
    id: clRequestId,
    studentId: applicant.id,
    thesisId: thesis.id,
    employeeId: deanId,
    submissionDate: new Date(),
    status: state,
    newTopic: 'nowy temat pracy',
    newDescription: 'nowy opis pracy',
    baseThesis: thesis,
    student: applicant
  };
}

const clarificationRequest: ClarificationRequest = createClRequest(clRequestId, student, thesis, deanId, RequestStatus.WAITING);

const clarificationRequests: ClarificationRequest[] = [clarificationRequest];


function createChRequest(chRequestId: IdType, applicant: Student, oldThesis: Thesis, newThesis: Thesis, pcmId: IdType, state: RequestStatus): ChangeRequest {
  return {
    id: chRequestId,
    studentId: applicant.id,
    employeeId: pcmId,
    submissionDate: new Date(),
    status: state,
    newThesisId: newThesis.id,
    newThesis: newThesis,
    oldThesisId: oldThesis.id,
    previousThesis: oldThesis,
    student: applicant
  };
}

const changeRequest: ChangeRequest = createChRequest(chRequestId, student, thesis, thesis, pcMemberId, RequestStatus.WAITING);

const changeRequests: ChangeRequest[] = [changeRequest];


const responseByApiKey: Dictionary<any> = {
  [ApiLabel.ABANDON_MEMBER_RESERVATION]: firstItem(reservationMembers),
  [ApiLabel.APPROVE_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: thesis,
  [ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER]: thesis,
  [ApiLabel.CONFIRM_MEMBER_RESERVATION]: firstItem(reservationMembers),
  [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: firstItem(reservationMembers),
  [ApiLabel.CREATE_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.CREATE_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.CREATE_THESIS]: thesis,
  [ApiLabel.CREATE_RESERVATION]: firstItem(reservations),
  [ApiLabel.GET_USER]: user,
  [ApiLabel.GET_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.GET_CHANGE_REQUESTS]: changeRequests,
  [ApiLabel.GET_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.GET_CLARIFICATION_REQUESTS]: clarificationRequests,
  [ApiLabel.GET_DIPLOMA_SESSION]: diplomaSession,
  [ApiLabel.GET_DIPLOMA_SESSIONS]: diplomaSessions,
  [ApiLabel.GET_FIELD_OF_STUDY]: fieldOfStudy,
  [ApiLabel.GET_RESERVATION]: firstItem(reservations),
  [ApiLabel.GET_RESERVATIONS]: reservations,
  [ApiLabel.GET_STUDENTS]: students,
  [ApiLabel.GET_TIMETABLE]: timetable,
  [ApiLabel.GET_THESIS]: thesis,
  [ApiLabel.GET_THESES]: theses,
  [ApiLabel.REJECT_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER]: clarificationRequest,
  [ApiLabel.REJECT_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: thesis,
  [ApiLabel.REQUEST_THESIS_CORRECTIONS]: thesis
};

function generateAuthData(): AuthData {
  return {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expireIn: new Date().getTime() + 5 * 1000 // 5 min
  };
}

function getStudent(query: RequestParams): Student {
  const id = query.getAll().find(p => p.name === 'id')!.value;
  return students.find(s => s.id === id)!;
}

function getEmployee(query: RequestParams): Employee {
  const id = query.getAll().find(p => p.name === 'id')!.value;
  return employees.find(e => e.id === id)!;
}

function getEmployees(query?: RequestParams): Employee[] {
  let response = employees;
  const role = query?.getAll().find(p => p.name === 'role')?.value;
  if (isNotNil(role)) {
    response = response.filter(f => f.employeeRole === role);
  }
  return response;
}

function getFieldsOfStudy(query?: RequestParams): FieldOfStudy[] {
  let response = fieldsOfStudy;
  const departmentId = query?.getAll().find(p => p.name === 'departmentId')?.value;
  if (isNotNil(departmentId)) {
    response = response.filter(f => f.departmentId === departmentId);
  }
  return response;
}

function getDiplomaSessions(query?: RequestParams): DiplomaSession[] {
  let response = diplomaSessions;
  const departmentId = query?.getAll().find(p => p.name === 'departmentId')?.value;
  const fieldOfStudyId = query?.getAll().find(p => p.name === 'fieldOfStudyId')?.value;
  if (isNotNil(departmentId)) {
    response = response.filter(ds => ds.fieldOfStudy.departmentId === departmentId);
  }
  if (isNotNil(fieldOfStudyId)) {
    response = response.filter(ds => ds.fieldOfStudyId === fieldOfStudyId);
  }
  return response;
}

function handleLabel(apiLabel: ApiLabel, query?: RequestParams): NonNullable<any> {
  switch (apiLabel) {
    case ApiLabel.LOGIN:
    case ApiLabel.REFRESH:
      return generateAuthData();
    case ApiLabel.GET_STUDENT:
      return getStudent(query!);
    case ApiLabel.GET_EMPLOYEE:
      return getEmployee(query!);
    case ApiLabel.GET_EMPLOYEES:
      return getEmployees(query);
    case ApiLabel.GET_FIELDS_OF_STUDY:
      return getFieldsOfStudy(query);
    case ApiLabel.GET_DIPLOMA_SESSIONS:
      return getDiplomaSessions(query);
    default:
      return responseByApiKey[apiLabel];
  }
}

export const FakeData = {
  handleApiLabel(apiLabel: ApiLabel, query?: RequestParams): NonNullable<any> {
    const response = handleLabel(apiLabel, query);
    if (isNil(response)) {
      throw new Error('FAKES: Unhandled Api Label: ' + apiLabel);
    }
    return response;
  },
  thesis
};
