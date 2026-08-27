
package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.User;
import com.vcms.village_committee_management_system.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // =========================================================
    // LOGIN
    // POST: /api/auth/login
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        // Check email
        if (email == null || email.trim().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }

        // Check password
        if (password == null || password.isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }

        // Clean email
        email = email.trim().toLowerCase();

        // Find user
        User user = userRepository.findByEmail(email);

        if (user == null) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        // Check stored password
        if (user.getPassword() == null
                || user.getPassword().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        // Compare password
        boolean passwordMatches =
                passwordEncoder.matches(
                        password,
                        user.getPassword()
                );

        if (!passwordMatches) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        // Login successful
        Map<String, Object> response = new HashMap<>();

        response.put("message", "Login successful");
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        response.put("address", user.getAddress());
        response.put("role", user.getRole());
        response.put("committeeId", user.getCommitteeId());

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // REGISTER / SIGNUP
    // POST: /api/auth/register
    // =========================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        // -----------------------------------------------------
        // CHECK USER DATA
        // -----------------------------------------------------

        if (user == null) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "User details are required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }


        // -----------------------------------------------------
        // NAME
        // -----------------------------------------------------

        if (user.getName() == null
                || user.getName().trim().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Name is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }


        // -----------------------------------------------------
        // EMAIL
        // -----------------------------------------------------

        if (user.getEmail() == null
                || user.getEmail().trim().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }


        // -----------------------------------------------------
        // PHONE
        // -----------------------------------------------------

        if (user.getPhone() == null
                || user.getPhone().trim().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Phone number is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }


        // -----------------------------------------------------
        // ADDRESS
        // -----------------------------------------------------

        if (user.getAddress() == null
                || user.getAddress().trim().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Address is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }


        // -----------------------------------------------------
        // PASSWORD
        // -----------------------------------------------------

        if (user.getPassword() == null
                || user.getPassword().isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password is required");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }


        // -----------------------------------------------------
        // CLEAN USER DATA
        // -----------------------------------------------------

        user.setName(
                user.getName().trim()
        );

        String email =
                user.getEmail()
                        .trim()
                        .toLowerCase();

        user.setEmail(email);

        user.setPhone(
                user.getPhone().trim()
        );

        user.setAddress(
                user.getAddress().trim()
        );


        // -----------------------------------------------------
        // CHECK DUPLICATE EMAIL
        // -----------------------------------------------------

        User existingUser =
                userRepository.findByEmail(email);

        if (existingUser != null) {

            Map<String, String> response = new HashMap<>();
            response.put(
                    "message",
                    "An account with this email already exists"
            );

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }


        // -----------------------------------------------------
        // SET DEFAULT ROLE
        // -----------------------------------------------------

        if (user.getRole() == null
                || user.getRole().trim().isEmpty()) {

            user.setRole("RESIDENT");

        } else {

            user.setRole(
                    user.getRole().trim()
            );
        }


        // -----------------------------------------------------
        // PASSWORD ENCRYPTION
        // -----------------------------------------------------

        String encodedPassword =
                passwordEncoder.encode(
                        user.getPassword()
                );

        user.setPassword(encodedPassword);


        // -----------------------------------------------------
        // NEW USER IS NOT ASSIGNED TO COMMITTEE
        // -----------------------------------------------------

        user.setCommitteeId(null);


        // -----------------------------------------------------
        // SAVE USER
        // -----------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // -----------------------------------------------------
        // REGISTRATION RESPONSE
        // -----------------------------------------------------

        Map<String, Object> response = new HashMap<>();

        response.put(
                "message",
                "Registration successful"
        );

        response.put(
                "id",
                savedUser.getId()
        );

        response.put(
                "name",
                savedUser.getName()
        );

        response.put(
                "email",
                savedUser.getEmail()
        );

        response.put(
                "phone",
                savedUser.getPhone()
        );

        response.put(
                "address",
                savedUser.getAddress()
        );

        response.put(
                "role",
                savedUser.getRole()
        );

        response.put(
                "committeeId",
                savedUser.getCommitteeId()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}

