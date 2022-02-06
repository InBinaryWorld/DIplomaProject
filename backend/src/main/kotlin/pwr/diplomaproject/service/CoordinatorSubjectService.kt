package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.CoordinatorCommentForm
import pwr.diplomaproject.model.notification.SubjectResolvedByCoordinator
import pwr.diplomaproject.repository.SubjectRepository

@Service
class CoordinatorSubjectService @Autowired constructor(
    private val subjectService: SubjectService,
    private val subjectRepository: SubjectRepository
) {

    companion object {

        private val VERIFIED_STATUSES = arrayOf(
            TopicStatus.TO_CORRECT,
            TopicStatus.REJECTED_BY_COORDINATOR,
            TopicStatus.APPROVED_BY_COORDINATOR
        )
    }

    fun getSubjectsToVerify(): List<SubjectDto> =
        subjectService.findAllByStatuses(TopicStatus.WAITING)
            .map { SubjectDtoFactory.create(it) }

    fun getSubjectsVerified(): List<SubjectDto> =
        subjectService.findAllByStatuses(*VERIFIED_STATUSES)
            .map { SubjectDtoFactory.create(it) }

    fun getSubject(id: Long): SubjectDetailsDto =
        subjectService.getDetails(id)

    fun acceptSubject(id: Long): Unit =
        subjectRepository.getById(id).let {
            it.status = TopicStatus.APPROVED_BY_COORDINATOR
            subjectRepository.save(it)
            SubjectResolvedByCoordinator(listOf(it.lecturer.user), it).send()
        }

    fun commentSubject(comments: CoordinatorCommentForm): Unit =
        subjectRepository.getById(comments.thesisId).let {
            it.status = TopicStatus.TO_CORRECT
            it.coordinatorComments = comments.comment
            subjectRepository.save(it)
            SubjectResolvedByCoordinator(listOf(it.lecturer.user), it).send()
        }

    fun rejectSubject(comments: CoordinatorCommentForm): Unit =
        subjectRepository.getById(comments.thesisId).let {
            it.status = TopicStatus.REJECTED_BY_COORDINATOR
            it.coordinatorComments = comments.comment
            SubjectResolvedByCoordinator(listOf(it.lecturer.user), it).send()
            subjectRepository.save(it)
        }
}