package com.estore.estore_backend.exceptions;


public class EmailAlreadyUsedException extends RuntimeException{
    public EmailAlreadyUsedException(String message){
        super(message);
    }
}
