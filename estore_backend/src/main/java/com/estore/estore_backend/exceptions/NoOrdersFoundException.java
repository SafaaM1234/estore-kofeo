package com.estore.estore_backend.exceptions;

public class NoOrdersFoundException extends RuntimeException {
    public NoOrdersFoundException(String message) {
        super(message);
    }
}
