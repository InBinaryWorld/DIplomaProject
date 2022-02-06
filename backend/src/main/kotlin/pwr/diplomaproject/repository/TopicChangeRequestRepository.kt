package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.TopicChangeRequest
import pwr.diplomaproject.model.enum.RequestResult

@Repository
interface TopicChangeRequestRepository : JpaRepository<TopicChangeRequest, Long> {

    @Query(value = "select max(r.id) + 1 from TopicChangeRequest r")
    fun getNextId(): Long

    fun findAllByStudentId(studentId: Long): List<TopicChangeRequest>

    @Query("FROM TopicChangeRequest req WHERE req.student.user.id = :userId AND req.id = :requestId")
    fun getByStudentUserIdAndRequestId(userId: Long, requestId: Long): TopicChangeRequest

    fun findAllByResultIn(results: List<RequestResult>): List<TopicChangeRequest>

    @Query("""
        FROM TopicChangeRequest req
        WHERE (:graduationId IS NULL OR req.oldTopic.graduation.id = :graduationId)
        AND (:studentId IS NULL OR req.student.id = :studentId)
        AND (:committeeId IS NULL OR req.employee.id = :committeeId)
    """)
    fun findAllByGraduationOrStudentOrCommittee(graduationId: Long?, studentId: Long?, committeeId: Long?): List<TopicChangeRequest>
}