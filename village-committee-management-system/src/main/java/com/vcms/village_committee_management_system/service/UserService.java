package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    boolean emailExists(String email);

    User findByEmail(String email);

}