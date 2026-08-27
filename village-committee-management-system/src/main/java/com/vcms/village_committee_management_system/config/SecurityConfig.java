package com.vcms.village_committee_management_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // ======================================================
    // PASSWORD ENCODER
    // ======================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // ======================================================
    // SECURITY
    // ======================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // Disable CSRF
                .csrf(csrf -> csrf.disable())

                // No session required
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Allow all APIs
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/**")
                        .permitAll()

                        .anyRequest()
                        .permitAll()
                );


        return http.build();
    }
}