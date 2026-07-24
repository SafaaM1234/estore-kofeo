package com.estore.estore_backend.customer.dto;

public class AuthResponse {
    private String message;
    private String email;
    private Long id;

    public AuthResponse() {}

    public AuthResponse(String message, String email, Long id) {
        this.message = message;
        this.email = email;
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}