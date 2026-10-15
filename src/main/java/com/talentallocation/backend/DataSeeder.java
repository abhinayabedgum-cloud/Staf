package com.talentallocation.backend;

import com.talentallocation.backend.model.*;
import com.talentallocation.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.util.List;

/**
 * Seeds the database with synthetic test data on startup.
 * Uses SYNTHETIC data only â€” no real employee information.
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            EmployeeRepository employeeRepo,
            SkillRepository skillRepo,
            EmployeeSkillRepository empSkillRepo,
            ProjectDemandRepository demandRepo,
            CertificationRepository certRepo) {

        return args -> {
            // Only seed if empty
            if (employeeRepo.count() > 0) {
                log.info("Database already seeded, skipping.");
                return;
            }
            log.info("Seeding database with synthetic test data...");

            // === SKILLS ===
            Skill java = skill(skillRepo, "Java", "Programming", "Core Java, JVM-based backend development");
            Skill springBoot = skill(skillRepo, "Spring Boot", "Programming", "Spring Boot microservices and REST APIs");
            Skill sql = skill(skillRepo, "SQL", "Database", "Relational database design and querying");
            Skill python = skill(skillRepo, "Python", "Programming", "Python scripting and data processing");
            Skill react = skill(skillRepo, "React", "Frontend", "React.js UI development");
            Skill docker = skill(skillRepo, "Docker", "DevOps", "Containerization and Docker Compose");
            Skill aws = skill(skillRepo, "AWS", "Cloud", "Amazon Web Services cloud infrastructure");
            Skill pm = skill(skillRepo, "Project Management", "Management", "Agile project management and SCRUM");
            Skill ml = skill(skillRepo, "Machine Learning", "AI/ML", "ML model training and deployment");
            Skill kubernetes = skill(skillRepo, "Kubernetes", "DevOps", "Container orchestration with Kubernetes");

            // === EMPLOYEES (Synthetic Data) ===
            Employee ram = employee(employeeRepo, "EMP001", "Ram", "Hyderabad",
                Employee.EmploymentStatus.ACTIVE, "Engineering", "ram@example.com",
                "Senior Java Developer", 6, "Project Phoenix", "Backend Lead",
                LocalDate.now().minusMonths(2), LocalDate.now().plusMonths(1), 75,
                Employee.AvailabilityStatus.AVAILABLE_FOR_NEW_PROJECT, LocalDate.now());
            cert(certRepo, ram, "Oracle Certified Professional: Java SE 17 Developer", "Oracle", LocalDate.of(2023, 5, 20), null);
            cert(certRepo, ram, "Spring Certified Professional", "VMware", LocalDate.of(2023, 11, 15), null);
            Employee nikhil = employee(employeeRepo, "EMP002", "Nikhil", "Pune",
                Employee.EmploymentStatus.ACTIVE, "Engineering", "nikhil@example.com",
                "Full Stack Developer", 4, "Enterprise CRM", "Full Stack Engineer",
                LocalDate.now().minusMonths(3), LocalDate.now().plusWeeks(2), 90,
                Employee.AvailabilityStatus.AVAILABLE_FOR_NEW_PROJECT, LocalDate.now());
            cert(certRepo, nikhil, "AWS Certified Developer - Associate", "Amazon Web Services", LocalDate.of(2023, 9, 10), LocalDate.of(2026, 9, 10));
            Employee shree = employee(employeeRepo, "EMP003", "Shree", "Hyderabad",
                Employee.EmploymentStatus.ACTIVE, "Data Science", "shree@example.com",
                "Data Scientist", 5, "Data Analytics Core", "ML Specialist",
                LocalDate.now().minusMonths(4), LocalDate.now().plusMonths(2), 60,
                Employee.AvailabilityStatus.PARTIALLY_AVAILABLE, LocalDate.now().plusMonths(1));
            cert(certRepo, shree, "TensorFlow Developer Certificate", "Google", LocalDate.of(2023, 4, 12), null);
            Employee preethi = employee(employeeRepo, "EMP004", "Preethi", "Pune",
                Employee.EmploymentStatus.ACTIVE, "DevOps", "preethi@example.com",
                "DevOps Specialist", 5, "Cloud Automation", "DevOps Engineer",
                LocalDate.now().minusMonths(1), LocalDate.now().plusMonths(3), 40,
                Employee.AvailabilityStatus.PARTIALLY_AVAILABLE, LocalDate.now().plusMonths(2));
            cert(certRepo, preethi, "Certified Kubernetes Administrator (CKA)", "Cloud Native Computing Foundation", LocalDate.of(2023, 8, 1), LocalDate.of(2026, 8, 1));
            Employee shruthi = employee(employeeRepo, "EMP005", "Shruthi", "Hyderabad",
                Employee.EmploymentStatus.ACTIVE, "Frontend", "shruthi@example.com",
                "Frontend Engineer", 3, "Customer Portal UI", "React Developer",
                LocalDate.now().minusMonths(2), LocalDate.now().plusWeeks(3), 85,
                Employee.AvailabilityStatus.AVAILABLE_FOR_NEW_PROJECT, LocalDate.now());
            Employee ashu = employee(employeeRepo, "EMP006", "Ashu", "Pune",
                Employee.EmploymentStatus.ON_LEAVE, "Engineering", "ashu@example.com",
                "Software Engineer", 2, null, null, null, null, 0,
                Employee.AvailabilityStatus.FULLY_ALLOCATED, LocalDate.now().plusMonths(3));

            // === EMPLOYEE SKILLS ===
            // Ram: Senior Java developer
            empSkill(empSkillRepo, ram, java, 5, LocalDate.of(2024, 3, 15), "Oracle Java SE 17 Certified");
            empSkill(empSkillRepo, ram, springBoot, 4, LocalDate.of(2024, 3, 15), "Built 3 production microservices");
            empSkill(empSkillRepo, ram, sql, 3, LocalDate.of(2023, 6, 1), "PostgreSQL experience");
            empSkill(empSkillRepo, ram, docker, 3, LocalDate.of(2023, 11, 1), "Docker Certified Associate");

            // Nikhil: Full stack, no ML
            empSkill(empSkillRepo, nikhil, java, 3, LocalDate.of(2023, 8, 10), "Java Developer certification");
            empSkill(empSkillRepo, nikhil, springBoot, 3, LocalDate.of(2023, 8, 10), "Spring Boot training completed");
            empSkill(empSkillRepo, nikhil, react, 4, LocalDate.of(2024, 1, 20), "React advanced course");
            empSkill(empSkillRepo, nikhil, sql, 4, LocalDate.of(2024, 2, 1), "MySQL DBA certification");

            // Shree: Data scientist
            empSkill(empSkillRepo, shree, python, 5, LocalDate.of(2024, 5, 1), "Python certified expert");
            empSkill(empSkillRepo, shree, ml, 4, LocalDate.of(2024, 4, 1), "Kaggle Grandmaster");
            empSkill(empSkillRepo, shree, sql, 3, LocalDate.of(2023, 9, 1), "Data analysis with SQL");

            // Preethi: DevOps expert
            empSkill(empSkillRepo, preethi, docker, 5, LocalDate.of(2024, 6, 1), "Docker certified expert");
            empSkill(empSkillRepo, preethi, kubernetes, 4, LocalDate.of(2024, 6, 1), "CKA certified");
            empSkill(empSkillRepo, preethi, aws, 4, LocalDate.of(2024, 3, 1), "AWS Solutions Architect");

            // Shruthi: Frontend developer
            empSkill(empSkillRepo, shruthi, react, 5, LocalDate.of(2024, 7, 1), "React core team contributor");
            empSkill(empSkillRepo, shruthi, python, 2, null, "Self-taught, no certification");

            // Ashu is on leave, no allocations

            // === PROJECT DEMANDS ===
            demand(demandRepo, "Project Phoenix", "Senior Java Developer",
                List.of(java.getId(), springBoot.getId()),
                LocalDate.now().plusDays(5), LocalDate.now().plusDays(90),
                "Hyderabad", 80, ProjectDemand.Priority.HIGH);

            demand(demandRepo, "Data Platform", "Data Scientist",
                List.of(python.getId(), ml.getId(), sql.getId()),
                LocalDate.now().plusDays(10), LocalDate.now().plusDays(120),
                "Remote", 100, ProjectDemand.Priority.CRITICAL);

            demand(demandRepo, "Cloud Migration", "DevOps Engineer",
                List.of(docker.getId(), kubernetes.getId(), aws.getId()),
                LocalDate.now().plusDays(1), LocalDate.now().plusDays(60),
                "Pune", 50, ProjectDemand.Priority.MEDIUM);

            demand(demandRepo, "Frontend Revamp", "React Developer",
                List.of(react.getId()),
                LocalDate.now().plusDays(14), LocalDate.now().plusDays(75),
                "Hyderabad", 100, ProjectDemand.Priority.LOW);

            log.info("âœ… Seeded: {} skills, {} employees, {} demands",
                skillRepo.count(), employeeRepo.count(), demandRepo.count());
        };
    }

    private Skill skill(SkillRepository repo, String name, String category, String desc) {
        Skill s = new Skill();
        s.setName(name); s.setCategory(category); s.setDescription(desc);
        return repo.save(s);
    }

    private Employee employee(EmployeeRepository repo, String code, String name,
                               String location, Employee.EmploymentStatus status,
                               String dept, String email, String currentRole, int experience,
                               String curProject, String projRole, LocalDate pStart, LocalDate pEnd,
                               int compPercent, Employee.AvailabilityStatus availStatus, LocalDate availDate) {
        Employee e = new Employee();
        e.setEmployeeCode(code); e.setName(name); e.setLocation(location);
        e.setEmploymentStatus(status); e.setDepartment(dept); e.setEmail(email);
        e.setCurrentRole(currentRole); e.setYearsOfExperience(experience);
        e.setCurrentProject(curProject); e.setProjectRole(projRole);
        e.setProjectStartDate(pStart); e.setProjectEndDate(pEnd);
        e.setProjectCompletionPercent(compPercent);
        e.setAvailabilityStatus(availStatus); e.setExpectedAvailabilityDate(availDate);
        return repo.save(e);
    }

    private void cert(CertificationRepository repo, Employee e, String name, String org, LocalDate issue, LocalDate expiry) {
        Certification c = new Certification();
        c.setEmployee(e); c.setName(name); c.setIssuingOrganization(org);
        c.setIssueDate(issue); c.setExpiryDate(expiry);
        repo.save(c);
    }

    private void empSkill(EmployeeSkillRepository repo, Employee e, Skill s,
                           int level, LocalDate validated, String evidence) {
        EmployeeSkill es = new EmployeeSkill();
        es.setEmployee(e); es.setSkill(s); es.setProficiencyLevel(level);
        es.setLastValidatedAt(validated); es.setEvidence(evidence);
        repo.save(es);
    }

    private void demand(ProjectDemandRepository repo, String project, String role,
                         List<Long> skillIds, LocalDate start, LocalDate end,
                         String location, int alloc, ProjectDemand.Priority priority) {
        ProjectDemand d = new ProjectDemand();
        d.setProjectName(project); d.setRole(role);
        d.setRequiredSkillIds(
            skillIds.stream().map(Object::toString).reduce((a,b) -> a+","+b).orElse(""));
        d.setStartDate(start); d.setEndDate(end); d.setLocation(location);
        d.setAllocationPercent(alloc); d.setPriority(priority);
        d.setStatus(ProjectDemand.DemandStatus.OPEN);
        repo.save(d);
    }
}
