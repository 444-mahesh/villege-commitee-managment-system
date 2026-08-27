package com.vcms.village_committee_management_system.entity;


import jakarta.persistence.*;
import java.time.LocalDate;



@Entity
@Table(name = "notices")
public class Notice {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String title;



    private String message;



    private String postedBy;



    private LocalDate createdDate;




    public Notice() {

    }




    public Notice(String title, String message,
                  String postedBy, LocalDate createdDate) {

        this.title = title;
        this.message = message;
        this.postedBy = postedBy;
        this.createdDate = createdDate;

    }




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



    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }



    public String getPostedBy() {
        return postedBy;
    }


    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }



    public LocalDate getCreatedDate() {
        return createdDate;
    }


    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

}