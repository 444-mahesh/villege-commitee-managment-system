package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.User;
import com.vcms.village_committee_management_system.repository.UserRepository;
import com.vcms.village_committee_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // ======================================================
    // SAVE USER
    // ======================================================

    @Override
    public User saveUser(User user) {

        /*
         * AuthController already encodes passwords during
         * registration.
         *
         * For normal user-management CRUD, encode only when
         * a new/plain password is supplied.
         */

        if (user.getPassword() != null &&
                !user.getPassword().isBlank()) {

            String password =
                    user.getPassword();

            /*
             * BCrypt hashes normally start with $2a$, $2b$
             * or $2y$.
             *
             * Do not encode an already encoded password.
             */

            if (!password.startsWith("$2a$") &&
                    !password.startsWith("$2b$") &&
                    !password.startsWith("$2y$")) {

                user.setPassword(
                        passwordEncoder.encode(password)
                );
            }
        }

        return userRepository.save(user);
    }


    // ======================================================
    // GET ALL USERS
    // ======================================================

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }


    // ======================================================
    // GET USER BY ID
    // ======================================================

    @Override
    public User getUserById(Long id) {

        return userRepository
                .findById(id)
                .orElse(null);

    }


    // ======================================================
    // UPDATE USER
    // ======================================================

    @Override
    public User updateUser(
            Long id,
            User user) {

        User existingUser =
                userRepository
                        .findById(id)
                        .orElse(null);


        if (existingUser == null) {

            return null;

        }


        existingUser.setName(
                user.getName()
        );

        existingUser.setEmail(
                user.getEmail()
        );

        existingUser.setPhone(
                user.getPhone()
        );

        existingUser.setAddress(
                user.getAddress()
        );

        existingUser.setRole(
                user.getRole()
        );


        /*
         * Only change password when a new password
         * is actually provided.
         */

        if (user.getPassword() != null &&
                !user.getPassword().isBlank()) {

            String password =
                    user.getPassword();


            if (!password.startsWith("$2a$") &&
                    !password.startsWith("$2b$") &&
                    !password.startsWith("$2y$")) {

                existingUser.setPassword(
                        passwordEncoder.encode(password)
                );

            } else {

                existingUser.setPassword(
                        password
                );
            }
        }


        /*
         * Preserve committee assignment if your User
         * entity contains committeeId.
         */

        try {

            existingUser.setCommitteeId(
                    user.getCommitteeId()
            );

        } catch (Exception ignored) {
            // Older User entity without committeeId
        }


        return userRepository.save(
                existingUser
        );
    }


    // ======================================================
    // DELETE USER
    // ======================================================

    @Override
    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }


    // ======================================================
    // CHECK EMAIL
    // ======================================================

    @Override
    public boolean emailExists(
            String email) {

        return userRepository
                .findByEmail(email) != null;

    }


    // ======================================================
    // FIND BY EMAIL
    // ======================================================

    @Override
    public User findByEmail(
            String email) {

        return userRepository
                .findByEmail(email);

    }
}