package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.Complaint;
import com.vcms.village_committee_management_system.repository.ComplaintRepository;
import com.vcms.village_committee_management_system.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintServiceImpl
        implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;


    // ======================================================
    // SAVE
    // ======================================================

    @Override
    public Complaint saveComplaint(
            Complaint complaint) {

        return complaintRepository.save(complaint);
    }


    // ======================================================
    // GET ALL
    // ======================================================

    @Override
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }


    // ======================================================
    // GET BY COMMITTEE
    // ======================================================

    @Override
    public List<Complaint> getComplaintsByCommittee(
            Long committeeId) {

        return complaintRepository
                .findByCommitteeId(committeeId);
    }


    // ======================================================
    // GET BY ID
    // ======================================================

    @Override
    public Complaint getComplaintById(
            Long id) {

        return complaintRepository
                .findById(id)
                .orElse(null);
    }


    // ======================================================
    // UPDATE
    // ======================================================

    @Override
    public Complaint updateComplaint(
            Long id,
            Complaint complaint) {

        complaint.setId(id);

        return complaintRepository.save(complaint);
    }


    // ======================================================
    // DELETE
    // ======================================================

    @Override
    public void deleteComplaint(
            Long id) {

        complaintRepository.deleteById(id);
    }
}