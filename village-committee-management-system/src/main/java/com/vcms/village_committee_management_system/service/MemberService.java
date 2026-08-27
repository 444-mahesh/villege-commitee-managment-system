package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.Member;

import java.util.List;

public interface MemberService {

    Member saveMember(Member member);

    List<Member> getAllMembers();

    Member getMemberById(Long id);

    List<Member> getMembersByCommittee(Long committeeId);

    List<Member> getMembersByUser(Long userId);

    Member updateMember(Long id, Member member);

    void deleteMember(Long id);
}