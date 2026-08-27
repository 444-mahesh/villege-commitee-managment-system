package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.Meeting;

import java.util.List;

public interface MeetingService {

    // Save Meeting
    Meeting saveMeeting(Meeting meeting);


    // Get All Meetings
    List<Meeting> getAllMeetings();


    // Get Meeting By Id
    Meeting getMeetingById(Long id);


    // Delete Meeting
    void deleteMeeting(Long id);
}