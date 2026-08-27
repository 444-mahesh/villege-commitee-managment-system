package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Member;
import com.vcms.village_committee_management_system.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@CrossOrigin("*")
public class MemberController {

    @Autowired
    private MemberService memberService;


    // ==========================================
    // GET ALL MEMBERS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {

        return ResponseEntity.ok(
                memberService.getAllMembers()
        );
    }


    // ==========================================
    // GET MEMBER BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    memberService.getMemberById(id)
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // ASSIGN USER TO COMMITTEE
    // ==========================================

    @PostMapping
    public ResponseEntity<?> addMember(
            @RequestBody Member member) {

        try {

            Member savedMember =
                    memberService.saveMember(member);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedMember);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // UPDATE COMMITTEE ASSIGNMENT
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(
            @PathVariable Long id,
            @RequestBody Member member) {

        try {

            Member updatedMember =
                    memberService.updateMember(
                            id,
                            member
                    );

            return ResponseEntity.ok(
                    updatedMember
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // DELETE / REMOVE ASSIGNMENT
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(
            @PathVariable Long id) {

        try {

            memberService.deleteMember(id);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Committee assignment removed successfully"
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // GET MEMBERS OF A COMMITTEE
    // ==========================================

    @GetMapping("/committee/{committeeId}")
    public ResponseEntity<List<Member>>
    getMembersByCommittee(
            @PathVariable Long committeeId) {

        return ResponseEntity.ok(
                memberService.getMembersByCommittee(
                        committeeId
                )
        );
    }


    // ==========================================
    // GET COMMITTEE ASSIGNMENTS OF USER
    // ==========================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Member>>
    getMembersByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                memberService.getMembersByUser(
                        userId
                )
        );
    }
}