package com.vcms.village_committee_management_system.repository;

import com.vcms.village_committee_management_system.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // Find all members belonging to a particular committee
    List<Member> findByCommitteeId(Long committeeId);

    // Find committee assignment(s) of a particular registered user
    List<Member> findByUserId(Long userId);

    // Check whether a user is already assigned to a committee
    boolean existsByUserId(Long userId);

    // Find a particular user's assignment in a particular committee
    Optional<Member> findByUserIdAndCommitteeId(
            Long userId,
            Long committeeId
    );
}