package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Meeting;
import com.vcms.village_committee_management_system.service.MeetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin("*")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;


    // ================= CREATE MEETING =================

    @PostMapping
    public Meeting saveMeeting(@RequestBody Meeting meeting) {

        return meetingService.saveMeeting(meeting);
    }


    // ================= GET ALL MEETINGS =================

    @GetMapping
    public List<Meeting> getAllMeetings() {

        return meetingService.getAllMeetings();
    }


    // ================= GET MEETING BY ID =================

    @GetMapping("/{id}")
    public Meeting getMeetingById(@PathVariable Long id) {

        return meetingService.getMeetingById(id);
    }


    // ================= UPDATE MEETING =================

    @PutMapping("/{id}")
    public Meeting updateMeeting(
            @PathVariable Long id,
            @RequestBody Meeting meeting) {

        Meeting existingMeeting = meetingService.getMeetingById(id);

        if (existingMeeting == null) {
            return null;
        }

        existingMeeting.setTitle(meeting.getTitle());
        existingMeeting.setMeetingDate(meeting.getMeetingDate());
        existingMeeting.setLocation(meeting.getLocation());
        existingMeeting.setAgenda(meeting.getAgenda());
        existingMeeting.setOrganizedBy(meeting.getOrganizedBy());

        return meetingService.saveMeeting(existingMeeting);
    }


    // ================= DELETE MEETING =================

    @DeleteMapping("/{id}")
    public String deleteMeeting(@PathVariable Long id) {

        meetingService.deleteMeeting(id);

        return "Meeting deleted successfully";
    }
}