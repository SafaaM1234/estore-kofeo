package com.estore.estore_backend.exceptions;

public class PurchaseRequiredException extends RuntimeException {
    public PurchaseRequiredException(String message) {
        super(message);
    }
}
