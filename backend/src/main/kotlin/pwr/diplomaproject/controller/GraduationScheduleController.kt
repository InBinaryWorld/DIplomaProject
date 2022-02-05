package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.GraduationScheduleDto
import pwr.diplomaproject.model.form.GraduationScheduleUpdateForm
import pwr.diplomaproject.service.GraduationScheduleService

@RestController
@RequestMapping("/graduation/schedule")
class GraduationScheduleController(
    private val graduationScheduleService: GraduationScheduleService
) {

    @Operation(summary = "Zwraca harmonogram")
    @GetMapping("/{scheduleId}")
    fun getSchedule(@PathVariable scheduleId: Long): GraduationScheduleDto =
        graduationScheduleService.getSchedule(scheduleId)

    @Operation(summary = "Aktualizuje harmonogram")
    @PutMapping("/{scheduleId}")
    fun updateSchedule(
        @PathVariable scheduleId: Long,
        @RequestBody form: GraduationScheduleUpdateForm
    ): Unit =
        graduationScheduleService.updateSchedule(scheduleId, form)

    /*TODO: Czy poniższe endpointy są nam potrzebne? Krzysiek mówi, że nie...

       @Operation(summary = "Zwraca aktywne harmonogramy")
       @GetMapping("/active")
       fun activeSchedules(@RequestParam diplomaSessionId: Long): List<GraduationScheduleDto> =
           graduationScheduleService.activeSchedules(diplomaSessionId)

       @Operation(summary = "Zwraca archiwalne harmonogramy")
       @GetMapping("/archival")
       fun archivalSchedules(): List<GraduationScheduleDto> =*/
}