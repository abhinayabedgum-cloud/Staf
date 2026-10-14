package com.talentallocation.backend.controller;

import com.talentallocation.backend.model.Skill;
import com.talentallocation.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

/**
 * Skill REST Controller
 * POST /api/skills     - Create skill
 * GET  /api/skills     - List all skills
 * GET  /api/skills/{id} - Get skill by ID
 */
@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillRepository skillRepository;

    @PostMapping
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody SkillRequest request) {
        if (skillRepository.existsByNameIgnoreCase(request.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Skill skill = new Skill();
        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setDescription(request.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED).body(skillRepository.save(skill));
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills(
            @RequestParam(required = false) String category) {
        List<Skill> skills = category != null
            ? skillRepository.findByCategoryIgnoreCase(category)
            : skillRepository.findAll();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkill(@PathVariable Long id) {
        return skillRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @Data
    public static class SkillRequest {
        @NotBlank(message = "Skill name is required")
        private String name;
        @NotBlank(message = "Category is required")
        private String category;
        private String description;
    }
}
