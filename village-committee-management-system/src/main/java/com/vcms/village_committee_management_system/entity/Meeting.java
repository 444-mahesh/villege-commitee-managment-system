package com.vcms.village_committee_management_system.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "meetings")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;


    private LocalDate meetingDate;


    private String location;


    private String agenda;


    private String organizedBy;


    // ================= CONSTRUCTOR =================

    public Meeting() {

    }


    public Meeting(
            String title,
            LocalDate meetingDate,
            String location,
            String agenda,
            String organizedBy) {

        this.title = title;
        this.meetingDate = meetingDate;
        this.location = location;
        this.agenda = agenda;
        this.organizedBy = organizedBy;
    }


    // ================= GETTERS & SETTERS =================

    public Long getId() {

        return id;
    }


    public void setId(Long id) {

        this.id = id;
    }


    public String getTitle() {

        return title;
    }


    public void setTitle(String title) {

        this.title = title;
    }


    public LocalDate getMeetingDate() {

        return meetingDate;
    }


    public void setMeetingDate(LocalDate meetingDate) {

        this.meetingDate = meetingDate;
    }


    public String getLocation() {

        return location;
    }


    public void setLocation(String location) {

        this.location = location;
    }


    public String getAgenda() {

        return agenda;
    }


    public void setAgenda(String agenda) {

        this.agenda = agenda;
    }


    public String getOrganizedBy() {

        return organizedBy;
    }


    public void setOrganizedBy(String organizedBy) {

        this.organizedBy = organizedBy;
    }
}