package com.vcms.village_committee_management_system.repository;

import com.vcms.village_committee_management_system.entity.Complaint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCommitteeId(Long committeeId);
}