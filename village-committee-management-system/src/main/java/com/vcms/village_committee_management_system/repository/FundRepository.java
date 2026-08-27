package com.vcms.village_committee_management_system.repository;

import com.vcms.village_committee_management_system.entity.Fund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundRepository extends JpaRepository<Fund, Long> {

}