package com.vcms.village_committee_management_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * ID of the registered user from USERS table.
     */
    private Long userId;

    private String memberName;

    private String email;

    private String phone;

    private String address;

    /*
     * Committee-specific role.
     *
     * Possible values:
     *
     * COMMITTEE_MEMBER
     * PRESIDENT
     * SECRETARY
     * TREASURER
     */
    private String role;

    /*
     * ID of the committee from COMMITTEES table.
     */
    private Long committeeId;

    // ==========================================
    // DEFAULT CONSTRUCTOR
    // ==========================================

    public Member() {
    }

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Member(
            Long userId,
            String memberName,
            String email,
            String phone,
            String address,
            String role,
            Long committeeId) {

        this.userId = userId;
        this.memberName = memberName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.committeeId = committeeId;
    }

    // ==========================================
    // GETTERS AND SETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getCommitteeId() {
        return committeeId;
    }

    public void setCommitteeId(Long committeeId) {
        this.committeeId = committeeId;
    }
}