package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.Complaint;

import java.util.List;

public interface ComplaintService {

    // Save complaint
    Complaint saveComplaint(Complaint complaint);

    // Get all complaints
    List<Complaint> getAllComplaints();

    // Get complaints assigned to committee
    List<Complaint> getComplaintsByCommittee(Long committeeId);

    // Get complaint by ID
    Complaint getComplaintById(Long id);

    // Update complaint
    Complaint updateComplaint(
            Long id,
            Complaint complaint
    );

    // Delete complaint
    void deleteComplaint(Long id);
}