package com.estore.estore_backend.exceptions;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String message){ 
        super(message); 
    }

}
