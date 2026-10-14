package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.TrainingRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrainingRecommendationRepository extends JpaRepository<TrainingRecommendation, Long> {

    List<TrainingRecommendation> findByEmployeeId(Long employeeId);

    List<TrainingRecommendation> findByEmployeeIdAndStatus(
        Long employeeId, TrainingRecommendation.TrainingStatus status
    );

    List<TrainingRecommendation> findBySkillId(Long skillId);

    boolean existsByEmployeeIdAndSkillId(Long employeeId, Long skillId);
}
