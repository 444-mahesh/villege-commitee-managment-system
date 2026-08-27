package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.User;
import com.vcms.village_committee_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // ================================
    // CREATE USER
    // ================================

    @PostMapping
    public User saveUser(
            @jakarta.validation.Valid
            @RequestBody User user) {

        return userService.saveUser(user);
    }

    // ================================
    // GET ALL USERS
    // ================================

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    // ================================
    // GET USER BY ID
    // ================================

    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id);
    }

    // ================================
    // UPDATE USER
    // ================================

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }

    // ================================
    // DELETE USER
    // ================================

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }
}