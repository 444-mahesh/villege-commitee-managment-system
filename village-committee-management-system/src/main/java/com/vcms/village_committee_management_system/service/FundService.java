package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.Fund;

import java.util.List;

public interface FundService {

    // Save Fund
    Fund saveFund(Fund fund);


    // Get All Funds
    List<Fund> getAllFunds();


    // Get Fund By Id
    Fund getFundById(Long id);


    // Delete Fund
    void deleteFund(Long id);
}