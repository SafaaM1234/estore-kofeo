package com.estore.estore_backend.exceptions;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(Long productId, int requested, int available) {
        super("Stock insuffisant pour le produit " + productId +
                " (demandé: " + requested + ", disponible: " + available + ")");
    }
}
