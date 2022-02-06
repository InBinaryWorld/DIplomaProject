package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.StudentSubjectPropositionForm
import pwr.diplomaproject.service.StudentSubjectService

@RestController
@RequestMapping("/student/subject")
class StudentSubjectController(
    private val studentSubjectService: StudentSubjectService
) {

    @Operation(summary = "Dostępne tematy do zarezerwowania przez zalogowanego studenta w podanej sesji dyplomowania")
    @GetMapping("/available")
    fun getAvailableSubjects(
        @RequestParam studentId: Long,
        @RequestParam diplomaSessionId: Long,
    ): List<SubjectDto> =
        studentSubjectService.getAvailableSubjects(studentId, diplomaSessionId)

    @Operation(summary = "Propozycje tematów złożone przez zalogowanego studenta w podanej sesji dyplomowania")
    @GetMapping("/proposed")
    fun getProposedSubjects(
        @RequestParam studentId: Long,
        @RequestParam diplomaSessionId: Long,
    ): List<SubjectDto> =
        studentSubjectService.getProposedSubjects(studentId, diplomaSessionId)

    @Operation(summary = "Dodanie propozycji tematu przez studenta w podanej sesji dyplomowania")
    @PostMapping("/propose")
    fun proposeSubject(
        @RequestParam studentId: Long,
        @RequestParam diplomaSessionId: Long,
        @RequestBody form: StudentSubjectPropositionForm
    ): Unit =
        studentSubjectService.proposeSubject(studentId, diplomaSessionId, form)

    @Operation(summary = "Usunięcie propozycji tematu studenta")
    @DeleteMapping("/proposed/{id}")
    fun deleteProposedSubject(
        @RequestParam studentId: Long,
        @PathVariable id: Long
    ): Unit =
        studentSubjectService.deleteProposedSubject(studentId, id)
}