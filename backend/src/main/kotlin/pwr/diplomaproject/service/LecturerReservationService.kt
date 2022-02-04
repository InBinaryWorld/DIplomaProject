package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDetailsDto
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDto
import pwr.diplomaproject.model.dto.factory.LecturerSubjectReservationDetailsDtoFactory
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.ReservationStatus
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.ReservationRepository
import pwr.diplomaproject.repository.SubjectRepository

@Service
class LecturerReservationService @Autowired constructor(
    private val reservationRepository: ReservationRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository
) {

    fun getSubjects(userId: Long): List<LecturerSubjectReservationDto> =
        subjectRepository.getLecturerReservationDetails(lecturerId(userId))

    fun getSubject(userId: Long, subjectId: Long): LecturerSubjectReservationDetailsDto {
        val subject = subjectRepository.getById(subjectId)
        val reservations = reservationRepository.findAllBySubjectIdAndLecturerId(subjectId, lecturerId(userId))

        return LecturerSubjectReservationDetailsDtoFactory.create(subject, reservations)
    }

    fun acceptReservation(userId: Long, id: Long): Unit =
        reservationRepository.getByIdAndLecturerId(id, lecturerId(userId)).let {
            it.status = ReservationStatus.ACCEPTED
            reservationRepository.save(it)
        }

    fun rejectReservation(userId: Long, id: Long): Unit =
        reservationRepository.getByIdAndLecturerId(id, lecturerId(userId)).let {
            it.status = ReservationStatus.REJECTED_BY_LECTURER
            reservationRepository.save(it)
        }

    private fun lecturerId(userId: Long) =
        employeeRepository.getEmployeeIdByUserIdAndType(userId, EmployeeType.LECTURER)
}