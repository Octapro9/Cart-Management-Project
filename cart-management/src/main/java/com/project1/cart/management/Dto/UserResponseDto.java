package com.project1.cart.management.Dto;

// Created to give user the response when it logs into the frontend part! Yo !!


public class UserResponseDto {
    private Long userId;
    private String username;
    private String email;
    private String userType;

    // Constructor
    public UserResponseDto(Long userId, String username, String email, String userType) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.userType = userType;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
