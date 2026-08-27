package com.vcms.village_committee_management_system.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "committees")
public class Committee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String committeeName;

    private String description;

    private String villageName;

    private LocalDate createdDate;

    public Committee() {
    }

    public Committee(
            String committeeName,
            String description,
            String villageName,
            LocalDate createdDate) {

        this.committeeName = committeeName;
        this.description = description;
        this.villageName = villageName;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommitteeName() {
        return committeeName;
    }

    public void setCommitteeName(String committeeName) {
        this.committeeName = committeeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVillageName() {
        return villageName;
    }

    public void setVillageName(String villageName) {
        this.villageName = villageName;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
}