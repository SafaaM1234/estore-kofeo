package com.estore.estore_backend.exceptions;

public class ReviewAlreadyExistsException extends RuntimeException{
    public ReviewAlreadyExistsException(String message) {
        super(message);
    }
}
