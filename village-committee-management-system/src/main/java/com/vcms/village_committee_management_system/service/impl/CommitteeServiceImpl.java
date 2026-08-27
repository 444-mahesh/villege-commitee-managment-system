package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.Committee;
import com.vcms.village_committee_management_system.repository.CommitteeRepository;
import com.vcms.village_committee_management_system.service.CommitteeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommitteeServiceImpl implements CommitteeService {

    @Autowired
    private CommitteeRepository committeeRepository;

    @Override
    public Committee saveCommittee(Committee committee) {
        return committeeRepository.save(committee);
    }

    @Override
    public List<Committee> getAllCommittees() {
        return committeeRepository.findAll();
    }

    @Override
    public Committee getCommitteeById(Long id) {
        return committeeRepository.findById(id)
                .orElse(null);
    }

    @Override
    public void deleteCommittee(Long id) {
        committeeRepository.deleteById(id);
    }
}