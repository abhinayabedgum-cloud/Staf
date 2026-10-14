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
 * Uses SYNTHETIC data only — no real employee information.
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
            ProjectDemandRepository demandRepo) {

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
            Employee alice = employee(employeeRepo, "EMP001", "Alice Johnson", "New York",
                Employee.EmploymentStatus.ACTIVE, "Engineering", "alice@example.com");
            Employee bob = employee(employeeRepo, "EMP002", "Bob Smith", "London",
                Employee.EmploymentStatus.ACTIVE, "Engineering", "bob@example.com");
            Employee carol = employee(employeeRepo, "EMP003", "Carol Williams", "New York",
                Employee.EmploymentStatus.ACTIVE, "Data Science", "carol@example.com");
            Employee dave = employee(employeeRepo, "EMP004", "Dave Brown", "Berlin",
                Employee.EmploymentStatus.ACTIVE, "DevOps", "dave@example.com");
            Employee eve = employee(employeeRepo, "EMP005", "Eve Davis", "New York",
                Employee.EmploymentStatus.ACTIVE, "Frontend", "eve@example.com");
            Employee frank = employee(employeeRepo, "EMP006", "Frank Miller", "London",
                Employee.EmploymentStatus.ON_LEAVE, "Engineering", "frank@example.com");

            // === EMPLOYEE SKILLS ===
            // Alice: Senior Java developer
            empSkill(empSkillRepo, alice, java, 5, LocalDate.of(2024, 3, 15), "Oracle Java SE 17 Certified");
            empSkill(empSkillRepo, alice, springBoot, 4, LocalDate.of(2024, 3, 15), "Built 3 production microservices");
            empSkill(empSkillRepo, alice, sql, 3, LocalDate.of(2023, 6, 1), "PostgreSQL experience");
            empSkill(empSkillRepo, alice, docker, 3, LocalDate.of(2023, 11, 1), "Docker Certified Associate");

            // Bob: Full stack, no ML
            empSkill(empSkillRepo, bob, java, 3, LocalDate.of(2023, 8, 10), "Java Developer certification");
            empSkill(empSkillRepo, bob, springBoot, 3, LocalDate.of(2023, 8, 10), "Spring Boot training completed");
            empSkill(empSkillRepo, bob, react, 4, LocalDate.of(2024, 1, 20), "React advanced course");
            empSkill(empSkillRepo, bob, sql, 4, LocalDate.of(2024, 2, 1), "MySQL DBA certification");

            // Carol: Data scientist
            empSkill(empSkillRepo, carol, python, 5, LocalDate.of(2024, 5, 1), "Python certified expert");
            empSkill(empSkillRepo, carol, ml, 4, LocalDate.of(2024, 4, 1), "Kaggle Grandmaster");
            empSkill(empSkillRepo, carol, sql, 3, LocalDate.of(2023, 9, 1), "Data analysis with SQL");

            // Dave: DevOps expert
            empSkill(empSkillRepo, dave, docker, 5, LocalDate.of(2024, 6, 1), "Docker certified expert");
            empSkill(empSkillRepo, dave, kubernetes, 4, LocalDate.of(2024, 6, 1), "CKA certified");
            empSkill(empSkillRepo, dave, aws, 4, LocalDate.of(2024, 3, 1), "AWS Solutions Architect");

            // Eve: Frontend developer
            empSkill(empSkillRepo, eve, react, 5, LocalDate.of(2024, 7, 1), "React core team contributor");
            empSkill(empSkillRepo, eve, python, 2, null, "Self-taught, no certification");

            // Frank is on leave, no allocations

            // === PROJECT DEMANDS ===
            demand(demandRepo, "Project Phoenix", "Senior Java Developer",
                List.of(java.getId(), springBoot.getId()),
                LocalDate.now().plusDays(5), LocalDate.now().plusDays(90),
                "New York", 80, ProjectDemand.Priority.HIGH);

            demand(demandRepo, "Data Platform", "Data Scientist",
                List.of(python.getId(), ml.getId(), sql.getId()),
                LocalDate.now().plusDays(10), LocalDate.now().plusDays(120),
                "Remote", 100, ProjectDemand.Priority.CRITICAL);

            demand(demandRepo, "Cloud Migration", "DevOps Engineer",
                List.of(docker.getId(), kubernetes.getId(), aws.getId()),
                LocalDate.now().plusDays(1), LocalDate.now().plusDays(60),
                "Berlin", 50, ProjectDemand.Priority.MEDIUM);

            demand(demandRepo, "Frontend Revamp", "React Developer",
                List.of(react.getId()),
                LocalDate.now().plusDays(14), LocalDate.now().plusDays(75),
                "New York", 100, ProjectDemand.Priority.LOW);

            log.info("✅ Seeded: {} skills, {} employees, {} demands",
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
                               String dept, String email) {
        Employee e = new Employee();
        e.setEmployeeCode(code); e.setName(name); e.setLocation(location);
        e.setEmploymentStatus(status); e.setDepartment(dept); e.setEmail(email);
        return repo.save(e);
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
