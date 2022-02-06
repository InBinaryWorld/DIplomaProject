package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.factory.SubjectDetailsDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.repository.SubjectRepository

@Service
class SubjectService @Autowired constructor(
    private val subjectRepository: SubjectRepository
) {

    fun findAllByStatuses(vararg statuses: TopicStatus): List<Topic> =
        subjectRepository.findAllByStatusIsIn(statuses.toList())

    fun getDetails(subjectId: Long): SubjectDetailsDto =
        SubjectDetailsDtoFactory.create(subjectRepository.getById(subjectId))

    fun getSubjects(status: TopicStatus?, graduationId: Long?, studentId: Long?): List<SubjectDetailsDto> =
        subjectRepository.findAllByStatusOrGraduationOrProposedStudent(status, graduationId, studentId)
            .map { SubjectDetailsDtoFactory.create(it) }
}