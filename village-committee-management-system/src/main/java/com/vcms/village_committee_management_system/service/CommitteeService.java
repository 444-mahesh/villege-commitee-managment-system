package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.Committee;

import java.util.List;

public interface CommitteeService {

    // Create / Update Committee
    Committee saveCommittee(Committee committee);

    // Get all committees
    List<Committee> getAllCommittees();

    // Get committee by ID
    Committee getCommitteeById(Long id);

    // Delete committee
    void deleteCommittee(Long id);
}