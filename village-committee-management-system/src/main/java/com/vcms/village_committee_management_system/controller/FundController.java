package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Fund;
import com.vcms.village_committee_management_system.service.FundService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funds")
@CrossOrigin("*")
public class FundController {

    @Autowired
    private FundService fundService;


    // ================= CREATE FUND =================

    @PostMapping
    public Fund saveFund(@RequestBody Fund fund) {

        return fundService.saveFund(fund);
    }


    // ================= GET ALL FUNDS =================

    @GetMapping
    public List<Fund> getAllFunds() {

        return fundService.getAllFunds();
    }


    // ================= GET FUND BY ID =================

    @GetMapping("/{id}")
    public Fund getFundById(@PathVariable Long id) {

        return fundService.getFundById(id);
    }


    // ================= UPDATE FUND =================

    @PutMapping("/{id}")
    public Fund updateFund(
            @PathVariable Long id,
            @RequestBody Fund fund) {

        Fund existingFund = fundService.getFundById(id);

        if (existingFund == null) {
            return null;
        }

        existingFund.setSource(fund.getSource());
        existingFund.setAmount(fund.getAmount());
        existingFund.setType(fund.getType());
        existingFund.setDescription(fund.getDescription());
        existingFund.setTransactionDate(fund.getTransactionDate());

        return fundService.saveFund(existingFund);
    }


    // ================= DELETE FUND =================

    @DeleteMapping("/{id}")
    public String deleteFund(@PathVariable Long id) {

        fundService.deleteFund(id);

        return "Fund deleted successfully";
    }
}