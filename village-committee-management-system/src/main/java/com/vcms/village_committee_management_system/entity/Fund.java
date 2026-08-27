package com.vcms.village_committee_management_system.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "funds")
public class Fund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String source;


    private Double amount;


    private String type;


    private String description;


    private LocalDate transactionDate;


    // ================= CONSTRUCTOR =================

    public Fund() {

    }


    public Fund(
            String source,
            Double amount,
            String type,
            String description,
            LocalDate transactionDate) {

        this.source = source;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.transactionDate = transactionDate;
    }


    // ================= GETTERS & SETTERS =================

    public Long getId() {

        return id;
    }


    public void setId(Long id) {

        this.id = id;
    }


    public String getSource() {

        return source;
    }


    public void setSource(String source) {

        this.source = source;
    }


    public Double getAmount() {

        return amount;
    }


    public void setAmount(Double amount) {

        this.amount = amount;
    }


    public String getType() {

        return type;
    }


    public void setType(String type) {

        this.type = type;
    }


    public String getDescription() {

        return description;
    }


    public void setDescription(String description) {

        this.description = description;
    }


    public LocalDate getTransactionDate() {

        return transactionDate;
    }


    public void setTransactionDate(LocalDate transactionDate) {

        this.transactionDate = transactionDate;
    }
}