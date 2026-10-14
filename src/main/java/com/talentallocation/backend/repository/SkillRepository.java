package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByNameIgnoreCase(String name);

    List<Skill> findByCategory(String category);

    List<Skill> findByCategoryIgnoreCase(String category);

    boolean existsByNameIgnoreCase(String name);
}
