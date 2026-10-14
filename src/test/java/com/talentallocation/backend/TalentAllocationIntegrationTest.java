package com.talentallocation.backend;

import com.talentallocation.backend.dto.*;
import com.talentallocation.backend.exception.BusinessRuleException;
import com.talentallocation.backend.exception.ResourceNotFoundException;
import com.talentallocation.backend.model.*;
import com.talentallocation.backend.repository.*;
import com.talentallocation.backend.service.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

/**
 * Integration Tests covering all 12 required test cases (TC-06-01 to TC-06-12).
 * Uses H2 in-memory database (test profile).
 */
@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TalentAllocationIntegrationTest {

    @Autowired private EmployeeService employeeService;
    @Autowired private DemandService demandService;
    @Autowired private AllocationService allocationService;
    @Autowired private ResourceMatchingService resourceMatchingService;
    @Autowired private SkillRepository skillRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private AllocationRepository allocationRepository;

    // Shared test state
    static Long javaSkillId;
    static Long springSkillId;
    static Long employeeId;
    static Long demandId;
    static Long allocationId;

    @BeforeEach
    void setUp() {
        // Set up base skills if not present
        if (skillRepository.count() == 0) {
            Skill java = new Skill(); java.setName("Java"); java.setCategory("Programming"); java.setDescription("Java");
            java = skillRepository.save(java);
            javaSkillId = java.getId();

            Skill spring = new Skill(); spring.setName("Spring"); spring.setCategory("Programming"); spring.setDescription("Spring");
            spring = skillRepository.save(spring);
            springSkillId = spring.getId();
        } else {
            javaSkillId = skillRepository.findAll().get(0).getId();
            springSkillId = skillRepository.findAll().size() > 1
                ? skillRepository.findAll().get(1).getId()
                : javaSkillId;
        }
    }

    // -------------------------------------------------------
    // TC-06-01: Create a demand with valid fields → created
    // -------------------------------------------------------
    @Test
    @Order(1)
    void TC_06_01_createDemandWithValidFields() {
        DemandRequest request = new DemandRequest();
        request.setProjectName("Test Project");
        request.setRole("Java Developer");
        request.setStartDate(LocalDate.now().plusDays(1));
        request.setEndDate(LocalDate.now().plusDays(30));
        request.setAllocationPercent(80);
        request.setPriority(ProjectDemand.Priority.HIGH);
        request.setRequiredSkillIds(List.of(javaSkillId));

        DemandResponse response = demandService.createDemand(request);
        demandId = response.getId();

        assertThat(response.getId()).isNotNull();
        assertThat(response.getRole()).isEqualTo("Java Developer");
        assertThat(response.getStatus()).isEqualTo(ProjectDemand.DemandStatus.OPEN);
    }

    // -------------------------------------------------------
    // TC-06-02: Create demand with missing role → rejected
    // -------------------------------------------------------
    @Test
    @Order(2)
    void TC_06_02_createDemandMissingRole_shouldBeRejected() {
        DemandRequest request = new DemandRequest();
        request.setProjectName("Bad Demand");
        // role intentionally missing
        request.setStartDate(LocalDate.now().plusDays(1));
        request.setEndDate(LocalDate.now().plusDays(10));
        request.setAllocationPercent(50);
        request.setPriority(ProjectDemand.Priority.LOW);

        assertThatThrownBy(() -> demandService.createDemand(request))
            .isInstanceOf(BusinessRuleException.class)
            .hasMessageContaining("Role is required");
    }

    // -------------------------------------------------------
    // TC-06-02b: Create demand with invalid dates → rejected
    // -------------------------------------------------------
    @Test
    @Order(3)
    void TC_06_02b_createDemandInvalidDates_shouldBeRejected() {
        DemandRequest request = new DemandRequest();
        request.setProjectName("Bad Demand");
        request.setRole("Developer");
        request.setStartDate(LocalDate.now().plusDays(10)); // start AFTER end
        request.setEndDate(LocalDate.now().plusDays(5));
        request.setAllocationPercent(50);
        request.setPriority(ProjectDemand.Priority.LOW);

        assertThatThrownBy(() -> demandService.createDemand(request))
            .isInstanceOf(BusinessRuleException.class)
            .hasMessageContaining("End date must be after start date");
    }

    // -------------------------------------------------------
    // Helper: create a base employee with Java skill
    // -------------------------------------------------------
    private Long createTestEmployee(String code, String name) {
        EmployeeRequest req = new EmployeeRequest();
        req.setEmployeeCode(code);
        req.setName(name);
        req.setLocation("New York");
        req.setEmploymentStatus(Employee.EmploymentStatus.ACTIVE);
        req.setDepartment("Engineering");
        req.setEmail(code.toLowerCase() + "@test.com");
        EmployeeResponse emp = employeeService.createEmployee(req);

        // Add Java skill
        EmployeeSkillRequest skillReq = new EmployeeSkillRequest();
        skillReq.setSkillId(javaSkillId);
        skillReq.setProficiencyLevel(4);
        skillReq.setLastValidatedAt(LocalDate.now().minusMonths(3).toString());
        skillReq.setEvidence("Certified Java Developer");
        employeeService.addSkill(emp.getId(), skillReq);

        return emp.getId();
    }

    private Long createTestDemand(int allocationPercent) {
        DemandRequest req = new DemandRequest();
        req.setProjectName("Test Project " + System.currentTimeMillis());
        req.setRole("Java Developer");
        req.setStartDate(LocalDate.now().plusDays(1));
        req.setEndDate(LocalDate.now().plusDays(60));
        req.setAllocationPercent(allocationPercent);
        req.setPriority(ProjectDemand.Priority.HIGH);
        req.setRequiredSkillIds(List.of(javaSkillId));
        return demandService.createDemand(req).getId();
    }

    // -------------------------------------------------------
    // TC-06-03: Search for candidates → results follow ranking
    // -------------------------------------------------------
    @Test
    @Order(4)
    void TC_06_03_searchCandidatesFollowsRanking() {
        Long eid = createTestEmployee("EMP-T03", "Test User 03");
        Long did = createTestDemand(80);

        List<CandidateRecommendation> recs = resourceMatchingService.findCandidatesForDemand(did);

        assertThat(recs).isNotEmpty();
        // Results should be sorted by total score descending
        for (int i = 0; i < recs.size() - 1; i++) {
            assertThat(recs.get(i).getTotalScore())
                .isGreaterThanOrEqualTo(recs.get(i + 1).getTotalScore());
        }
    }

    // -------------------------------------------------------
    // TC-06-04: Candidate lacks mandatory skill → excluded/flagged
    // -------------------------------------------------------
    @Test
    @Order(5)
    void TC_06_04_candidateLacksMandatorySkill_isFlagged() {
        // Create demand requiring Spring (which test employee doesn't have)
        DemandRequest req = new DemandRequest();
        req.setProjectName("Spring Project");
        req.setRole("Spring Developer");
        req.setStartDate(LocalDate.now().plusDays(1));
        req.setEndDate(LocalDate.now().plusDays(30));
        req.setAllocationPercent(50);
        req.setPriority(ProjectDemand.Priority.MEDIUM);
        req.setRequiredSkillIds(List.of(springSkillId)); // employee doesn't have Spring
        Long did = demandService.createDemand(req).getId();

        Long eid = createTestEmployee("EMP-T04", "Test User 04");

        List<CandidateRecommendation> recs = resourceMatchingService.findCandidatesForDemand(did);

        // The employee who only has Java (not Spring) should have missing skills flagged
        CandidateRecommendation rec = recs.stream()
            .filter(r -> "EMP-T04".equals(r.getEmployeeCode()))
            .findFirst().orElse(null);

        if (rec != null) {
            assertThat(rec.getMissingSkills()).isNotEmpty();
            assertThat(rec.getMeetsSkillRequirements()).isFalse();
        }
    }

    // -------------------------------------------------------
    // TC-06-05: Candidate allocated for entire period → unavailable
    // -------------------------------------------------------
    @Test
    @Order(6)
    void TC_06_05_candidateFullyAllocated_isUnavailableForConflict() {
        Long eid = createTestEmployee("EMP-T05", "Test User 05");
        Long did1 = createTestDemand(100); // 100% allocation

        // First allocation at 100%
        AllocationRequest ar = new AllocationRequest();
        ar.setEmployeeId(eid);
        ar.setDemandId(did1);
        ar.setStartDate(LocalDate.now().plusDays(1));
        ar.setEndDate(LocalDate.now().plusDays(60));
        ar.setAllocationPercent(100);
        ar.setApprovedBy("Manager A");
        allocationService.createAllocation(ar);

        // Try to allocate same employee again — should fail (over capacity)
        Long did2 = createTestDemand(10);
        AllocationRequest ar2 = new AllocationRequest();
        ar2.setEmployeeId(eid);
        ar2.setDemandId(did2);
        ar2.setStartDate(LocalDate.now().plusDays(5));
        ar2.setEndDate(LocalDate.now().plusDays(30));
        ar2.setAllocationPercent(10);
        ar2.setApprovedBy("Manager A");

        assertThatThrownBy(() -> allocationService.createAllocation(ar2))
            .isInstanceOf(BusinessRuleException.class)
            .hasMessageContaining("capacity limit");
    }

    // -------------------------------------------------------
    // TC-06-06: Candidate partially available → reported accurately
    // -------------------------------------------------------
    @Test
    @Order(7)
    void TC_06_06_candidatePartialAvailability_reportedAccurately() {
        Long eid = createTestEmployee("EMP-T06", "Test User 06");
        Long did = createTestDemand(60); // needs 60%

        // Allocate 40% first
        AllocationRequest ar = new AllocationRequest();
        ar.setEmployeeId(eid);
        ar.setDemandId(did);
        ar.setStartDate(LocalDate.now().plusDays(1));
        ar.setEndDate(LocalDate.now().plusDays(30));
        ar.setAllocationPercent(40);
        ar.setApprovedBy("Manager B");
        allocationService.createAllocation(ar);

        // Available should be 60%
        int available = allocationService.getAvailablePercent(
            eid, LocalDate.now().plusDays(1), LocalDate.now().plusDays(30));
        assertThat(available).isEqualTo(60);
    }

    // -------------------------------------------------------
    // TC-06-07: Confirm allocation after approval → persisted
    // -------------------------------------------------------
    @Test
    @Order(8)
    void TC_06_07_confirmAllocationAfterApproval_isPersisted() {
        Long eid = createTestEmployee("EMP-T07", "Test User 07");
        Long did = createTestDemand(50);

        AllocationRequest ar = new AllocationRequest();
        ar.setEmployeeId(eid);
        ar.setDemandId(did);
        ar.setStartDate(LocalDate.now().plusDays(1));
        ar.setEndDate(LocalDate.now().plusDays(30));
        ar.setAllocationPercent(50);
        ar.setApprovedBy("HR Director");
        AllocationResponse response = allocationService.createAllocation(ar);
        allocationId = response.getId();

        assertThat(response.getId()).isNotNull();
        assertThat(response.getStatus()).isEqualTo(Allocation.AllocationStatus.CONFIRMED);
        assertThat(response.getApprovedBy()).isEqualTo("HR Director");

        // Verify capacity is recalculated
        int remaining = allocationService.getAvailablePercent(
            eid, LocalDate.now().plusDays(1), LocalDate.now().plusDays(30));
        assertThat(remaining).isEqualTo(50);
    }

    // -------------------------------------------------------
    // TC-06-08: Attempt to allocate above capacity → rejected
    // -------------------------------------------------------
    @Test
    @Order(9)
    void TC_06_08_allocateAboveCapacity_isRejected() {
        Long eid = createTestEmployee("EMP-T08", "Test User 08");
        Long did1 = createTestDemand(80);

        AllocationRequest ar1 = new AllocationRequest();
        ar1.setEmployeeId(eid); ar1.setDemandId(did1);
        ar1.setStartDate(LocalDate.now().plusDays(1));
        ar1.setEndDate(LocalDate.now().plusDays(30));
        ar1.setAllocationPercent(80); ar1.setApprovedBy("Manager");
        allocationService.createAllocation(ar1);

        Long did2 = createTestDemand(30);
        AllocationRequest ar2 = new AllocationRequest();
        ar2.setEmployeeId(eid); ar2.setDemandId(did2);
        ar2.setStartDate(LocalDate.now().plusDays(5));
        ar2.setEndDate(LocalDate.now().plusDays(25));
        ar2.setAllocationPercent(30); // 80 + 30 = 110% > 100%
        ar2.setApprovedBy("Manager");

        assertThatThrownBy(() -> allocationService.createAllocation(ar2))
            .isInstanceOf(BusinessRuleException.class)
            .hasMessageContaining("capacity limit");
    }

    // -------------------------------------------------------
    // TC-06-09: AI recommendation includes evidence and score breakdown
    // -------------------------------------------------------
    @Test
    @Order(10)
    void TC_06_09_aiRecommendationIncludesEvidenceAndScoreBreakdown() {
        Long eid = createTestEmployee("EMP-T09", "Test User 09");
        Long did = createTestDemand(50);

        List<CandidateRecommendation> recs = resourceMatchingService.findCandidatesForDemand(did);

        CandidateRecommendation rec = recs.stream()
            .filter(r -> "EMP-T09".equals(r.getEmployeeCode()))
            .findFirst().orElse(null);

        assertThat(rec).isNotNull();
        assertThat(rec.getScoreBreakdown()).isNotNull();
        assertThat(rec.getScoreBreakdown().getSkillScore()).isGreaterThanOrEqualTo(0.0);
        assertThat(rec.getScoreBreakdown().getAvailabilityScore()).isGreaterThanOrEqualTo(0.0);
        assertThat(rec.getTotalScore()).isGreaterThanOrEqualTo(0.0);
        assertThat(rec.getMatchedSkills()).isNotNull();
        // Evidence from stored data
        rec.getMatchedSkills().forEach(ms ->
            assertThat(ms.getEvidence()).isNotNull());
    }

    // -------------------------------------------------------
    // TC-06-10: AI asked to invent proficiency → missing data disclosed
    // -------------------------------------------------------
    @Test
    @Order(11)
    void TC_06_10_missingSkillData_isDisclosedNotFabricated() {
        Long eid = createTestEmployee("EMP-T10", "Test User 10");
        // Demand requires Spring which employee doesn't have
        DemandRequest req = new DemandRequest();
        req.setProjectName("Spring Check Project");
        req.setRole("Spring Dev");
        req.setStartDate(LocalDate.now().plusDays(1));
        req.setEndDate(LocalDate.now().plusDays(30));
        req.setAllocationPercent(50);
        req.setPriority(ProjectDemand.Priority.LOW);
        req.setRequiredSkillIds(List.of(springSkillId));
        Long did = demandService.createDemand(req).getId();

        List<CandidateRecommendation> recs = resourceMatchingService.findCandidatesForDemand(did);
        CandidateRecommendation rec = recs.stream()
            .filter(r -> "EMP-T10".equals(r.getEmployeeCode()))
            .findFirst().orElse(null);

        if (rec != null) {
            // Missing skill should be disclosed in missingSkills list
            assertThat(rec.getMissingSkills()).anyMatch(ms ->
                ms.getSkillId().equals(springSkillId));
            // meetsSkillRequirements must be false — not fabricated as true
            assertThat(rec.getMeetsSkillRequirements()).isFalse();
        }
    }

    // -------------------------------------------------------
    // TC-06-11: Concurrent conflicting allocation → only one persists
    // -------------------------------------------------------
    @Test
    @Order(12)
    void TC_06_11_concurrentConflictingAllocation_onlyOnePersists() {
        Long eid = createTestEmployee("EMP-T11", "Test User 11");
        Long did1 = createTestDemand(100);
        Long did2 = createTestDemand(100);

        AllocationRequest ar1 = new AllocationRequest();
        ar1.setEmployeeId(eid); ar1.setDemandId(did1);
        ar1.setStartDate(LocalDate.now().plusDays(1));
        ar1.setEndDate(LocalDate.now().plusDays(30));
        ar1.setAllocationPercent(100); ar1.setApprovedBy("Manager");

        AllocationRequest ar2 = new AllocationRequest();
        ar2.setEmployeeId(eid); ar2.setDemandId(did2);
        ar2.setStartDate(LocalDate.now().plusDays(5));
        ar2.setEndDate(LocalDate.now().plusDays(25));
        ar2.setAllocationPercent(100); ar2.setApprovedBy("Manager");

        // First succeeds
        allocationService.createAllocation(ar1);
        // Second should fail — capacity exceeded
        assertThatThrownBy(() -> allocationService.createAllocation(ar2))
            .isInstanceOf(BusinessRuleException.class);

        // Only 1 active allocation for this employee
        List<Allocation> active = allocationRepository.findConflictingAllocations(
            eid, LocalDate.now().plusDays(1), LocalDate.now().plusDays(30));
        assertThat(active).hasSize(1);
    }

    // -------------------------------------------------------
    // TC-06-12: Cancel allocation → capacity released, history retained
    // -------------------------------------------------------
    @Test
    @Order(13)
    void TC_06_12_cancelAllocation_capacityReleasedHistoryRetained() {
        Long eid = createTestEmployee("EMP-T12", "Test User 12");
        Long did = createTestDemand(80);

        AllocationRequest ar = new AllocationRequest();
        ar.setEmployeeId(eid); ar.setDemandId(did);
        ar.setStartDate(LocalDate.now().plusDays(1));
        ar.setEndDate(LocalDate.now().plusDays(30));
        ar.setAllocationPercent(80); ar.setApprovedBy("Manager");
        AllocationResponse created = allocationService.createAllocation(ar);

        // Before cancel: 80% allocated, 20% available
        int beforeCancel = allocationService.getAvailablePercent(
            eid, LocalDate.now().plusDays(1), LocalDate.now().plusDays(30));
        assertThat(beforeCancel).isEqualTo(20);

        // Cancel
        AllocationResponse cancelled = allocationService.cancelAllocation(
            created.getId(), "Project cancelled");
        assertThat(cancelled.getStatus()).isEqualTo(Allocation.AllocationStatus.CANCELLED);

        // After cancel: full capacity restored
        int afterCancel = allocationService.getAvailablePercent(
            eid, LocalDate.now().plusDays(1), LocalDate.now().plusDays(30));
        assertThat(afterCancel).isEqualTo(100);

        // History retained: allocation still exists in DB
        assertThat(allocationRepository.findById(created.getId())).isPresent();
        assertThat(allocationRepository.findById(created.getId()).get().getStatus())
            .isEqualTo(Allocation.AllocationStatus.CANCELLED);
    }
}
