package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByEmployeeId(Long employeeId);
    void deleteByEmployeeId(Long employeeId);
}
