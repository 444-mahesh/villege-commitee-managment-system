package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.Meeting;
import com.vcms.village_committee_management_system.repository.MeetingRepository;
import com.vcms.village_committee_management_system.service.MeetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;


    // ================= SAVE =================

    @Override
    public Meeting saveMeeting(Meeting meeting) {

        return meetingRepository.save(meeting);
    }


    // ================= GET ALL =================

    @Override
    public List<Meeting> getAllMeetings() {

        return meetingRepository.findAll();
    }


    // ================= GET BY ID =================

    @Override
    public Meeting getMeetingById(Long id) {

        return meetingRepository.findById(id)
                .orElse(null);
    }


    // ================= DELETE =================

    @Override
    public void deleteMeeting(Long id) {

        meetingRepository.deleteById(id);
    }
}