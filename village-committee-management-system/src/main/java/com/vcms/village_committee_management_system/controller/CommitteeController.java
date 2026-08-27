package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Committee;
import com.vcms.village_committee_management_system.service.CommitteeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/committees")
@CrossOrigin("*")
public class CommitteeController {

    @Autowired
    private CommitteeService committeeService;

    // Create Committee
    @PostMapping
    public Committee saveCommittee(@RequestBody Committee committee) {

        return committeeService.saveCommittee(committee);
    }

    // Get All Committees
    @GetMapping
    public List<Committee> getAllCommittees() {

        return committeeService.getAllCommittees();
    }

    // Get Committee By ID
    @GetMapping("/{id}")
    public Committee getCommitteeById(@PathVariable Long id) {

        return committeeService.getCommitteeById(id);
    }

    // Delete Committee
    @DeleteMapping("/{id}")
    public String deleteCommittee(@PathVariable Long id) {

        committeeService.deleteCommittee(id);

        return "Committee deleted successfully";
    }
}