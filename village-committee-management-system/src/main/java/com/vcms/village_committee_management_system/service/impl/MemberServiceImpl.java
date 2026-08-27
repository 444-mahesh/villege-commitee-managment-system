package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.Member;
import com.vcms.village_committee_management_system.entity.User;
import com.vcms.village_committee_management_system.exception.ResourceNotFoundException;
import com.vcms.village_committee_management_system.repository.MemberRepository;
import com.vcms.village_committee_management_system.repository.UserRepository;
import com.vcms.village_committee_management_system.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private UserRepository userRepository;

    // ==========================================
    // ADD / ASSIGN USER TO COMMITTEE
    // ==========================================

    @Override
    public Member saveMember(Member member) {

        if (member.getUserId() == null) {
            throw new IllegalArgumentException(
                    "User ID is required"
            );
        }

        if (member.getCommitteeId() == null) {
            throw new IllegalArgumentException(
                    "Committee ID is required"
            );
        }

        // Find registered VCMS user
        User user = userRepository.findById(
                member.getUserId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "User not found with id: "
                                + member.getUserId()
                )
        );

        // Check whether user is already assigned
        if (memberRepository.existsByUserId(
                member.getUserId())) {

            throw new IllegalArgumentException(
                    "This user is already assigned to a committee"
            );
        }

        // ==========================================
        // UPDATE USER ACCOUNT
        // ==========================================

        user.setCommitteeId(
                member.getCommitteeId()
        );

        /*
         * The role selected by Admin becomes
         * the user's actual system role.
         */
        if (member.getRole() != null &&
                !member.getRole().trim().isEmpty()) {

            user.setRole(
                    member.getRole().toUpperCase()
            );
        } else {

            user.setRole("COMMITTEE_MEMBER");
        }

        userRepository.save(user);

        // ==========================================
        // COPY USER INFORMATION INTO MEMBER
        // ==========================================

        member.setMemberName(
                user.getName()
        );

        member.setEmail(
                user.getEmail()
        );

        member.setPhone(
                user.getPhone()
        );

        member.setAddress(
                user.getAddress()
        );

        member.setRole(
                user.getRole()
        );

        member.setCommitteeId(
                user.getCommitteeId()
        );

        return memberRepository.save(member);
    }

    // ==========================================
    // GET ALL MEMBERS
    // ==========================================

    @Override
    public List<Member> getAllMembers() {

        return memberRepository.findAll();
    }

    // ==========================================
    // GET MEMBER BY ID
    // ==========================================

    @Override
    public Member getMemberById(Long id) {

        return memberRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Member not found with id: " + id
                        )
                );
    }

    // ==========================================
    // GET MEMBERS BY COMMITTEE
    // ==========================================

    @Override
    public List<Member> getMembersByCommittee(
            Long committeeId) {

        return memberRepository.findByCommitteeId(
                committeeId
        );
    }

    // ==========================================
    // GET MEMBERS BY USER
    // ==========================================

    @Override
    public List<Member> getMembersByUser(
            Long userId) {

        return memberRepository.findByUserId(
                userId
        );
    }

    // ==========================================
    // UPDATE MEMBER
    // ==========================================

    @Override
    public Member updateMember(
            Long id,
            Member member) {

        Member existingMember =
                memberRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Member not found with id: "
                                                + id
                                )
                        );

        // Existing registered user
        User user = userRepository.findById(
                existingMember.getUserId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "User not found with id: "
                                + existingMember.getUserId()
                )
        );

        // ==========================================
        // UPDATE COMMITTEE
        // ==========================================

        if (member.getCommitteeId() != null) {

            user.setCommitteeId(
                    member.getCommitteeId()
            );

            existingMember.setCommitteeId(
                    member.getCommitteeId()
            );
        }

        // ==========================================
        // UPDATE ROLE
        // ==========================================

        if (member.getRole() != null &&
                !member.getRole().trim().isEmpty()) {

            String newRole =
                    member.getRole().toUpperCase();

            user.setRole(newRole);

            existingMember.setRole(newRole);
        }

        // Save updated User
        userRepository.save(user);

        // ==========================================
        // REFRESH MEMBER INFORMATION
        // ==========================================

        existingMember.setMemberName(
                user.getName()
        );

        existingMember.setEmail(
                user.getEmail()
        );

        existingMember.setPhone(
                user.getPhone()
        );

        existingMember.setAddress(
                user.getAddress()
        );

        return memberRepository.save(
                existingMember
        );
    }

    // ==========================================
    // DELETE / REMOVE FROM COMMITTEE
    // ==========================================

    @Override
    public void deleteMember(Long id) {

        Member member =
                memberRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Member not found with id: "
                                                + id
                                )
                        );

        // Find corresponding registered user
        if (member.getUserId() != null) {

            userRepository.findById(
                    member.getUserId()
            ).ifPresent(user -> {

                /*
                 * Removing the committee assignment
                 * turns the user back into a normal
                 * VILLAGER.
                 */
                user.setCommitteeId(null);
                user.setRole("VILLAGER");

                userRepository.save(user);
            });
        }

        // Remove member assignment
        memberRepository.deleteById(id);
    }
}