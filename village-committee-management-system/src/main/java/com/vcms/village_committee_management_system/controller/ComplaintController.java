package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Complaint;
import com.vcms.village_committee_management_system.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;


    // ======================================================
    // CREATE
    // ======================================================

    @PostMapping
    public ResponseEntity<Complaint> saveComplaint(
            @RequestBody Complaint complaint) {

        Complaint saved =
                complaintService.saveComplaint(complaint);

        return ResponseEntity.ok(saved);
    }


    // ======================================================
    // GET ALL
    // ======================================================

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }


    // ======================================================
    // GET BY COMMITTEE
    // ======================================================

    @GetMapping("/committee/{committeeId}")
    public ResponseEntity<List<Complaint>>
    getComplaintsByCommittee(
            @PathVariable Long committeeId) {

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByCommittee(
                                committeeId
                        )
        );
    }


    // ======================================================
    // GET BY ID
    // ======================================================

    @GetMapping("/{id}")
    public ResponseEntity<Complaint>
    getComplaintById(
            @PathVariable Long id) {

        Complaint complaint =
                complaintService
                        .getComplaintById(id);

        if (complaint == null) {

            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(complaint);
    }


    // ======================================================
    // UPDATE
    // ======================================================

    @PutMapping("/{id}")
    public ResponseEntity<Complaint>
    updateComplaint(
            @PathVariable Long id,
            @RequestBody Complaint complaint) {

        complaint.setId(id);

        Complaint updated =
                complaintService
                        .saveComplaint(complaint);

        return ResponseEntity.ok(updated);
    }


    // ======================================================
    // DELETE
    // ======================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteComplaint(
            @PathVariable Long id) {

        complaintService.deleteComplaint(id);

        return ResponseEntity.ok(
                "Complaint deleted successfully"
        );
    }
}