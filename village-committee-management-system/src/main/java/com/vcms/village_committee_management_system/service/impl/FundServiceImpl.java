package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.Fund;
import com.vcms.village_committee_management_system.repository.FundRepository;
import com.vcms.village_committee_management_system.service.FundService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundServiceImpl implements FundService {

    @Autowired
    private FundRepository fundRepository;


    // ================= SAVE =================

    @Override
    public Fund saveFund(Fund fund) {

        return fundRepository.save(fund);
    }


    // ================= GET ALL =================

    @Override
    public List<Fund> getAllFunds() {

        return fundRepository.findAll();
    }


    // ================= GET BY ID =================

    @Override
    public Fund getFundById(Long id) {

        return fundRepository.findById(id)
                .orElse(null);
    }


    // ================= DELETE =================

    @Override
    public void deleteFund(Long id) {

        fundRepository.deleteById(id);
    }
}