package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.DeanCorrectionRequestDetailsDto
import pwr.diplomaproject.model.dto.DeanRequestDto
import pwr.diplomaproject.model.dto.factory.DeanRequestDtoFactory
import pwr.diplomaproject.model.entity.Employee
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.RequestResult
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.SubjectRepository
import pwr.diplomaproject.repository.TopicCorrectionRequestRepository
import javax.transaction.Transactional

@Service
class DeanCorrectionRequestService @Autowired constructor(
    private val topicCorrectionRequestRepository: TopicCorrectionRequestRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository
){

    fun getCorrectionRequestsToConsider(): List<DeanRequestDto> =
        topicCorrectionRequestRepository.findAllByResultIn(listOf(RequestResult.WAITING))
            .map { DeanRequestDtoFactory.create(it) }

    fun getCorrectionRequestsConsidered(): List<DeanRequestDto> =
        topicCorrectionRequestRepository.findAllByResultIn(listOf(RequestResult.REJECTED, RequestResult.ACCEPTED))
            .map { DeanRequestDtoFactory.create(it) }

    fun getCorrectionRequest(id: Long): DeanCorrectionRequestDetailsDto =
        topicCorrectionRequestRepository.getCorrectionRequestDetails(id)

    @Transactional
    fun acceptCorrectionRequest(userId: Long, id: Long): Unit =
        topicCorrectionRequestRepository.getById(id).let {
            it.result = RequestResult.ACCEPTED
            it.employee = dean(userId)

            subjectRepository.getByCorrectionRequestId(id).let { topic ->
                topic.topic = it.newTopic
                topic.description = it.newDescription
                subjectRepository.save(topic)
            }

            topicCorrectionRequestRepository.save(it)
        }

    fun rejectCorrectionRequest(userId: Long, id: Long): Unit =
        topicCorrectionRequestRepository.getById(id).let {
            it.result = RequestResult.REJECTED
            it.employee = dean(userId)
            topicCorrectionRequestRepository.save(it)
        }

    private fun dean(userId: Long): Employee =
        employeeRepository.getEmployeeByUserIdAndType(userId, EmployeeType.DEAN)
}