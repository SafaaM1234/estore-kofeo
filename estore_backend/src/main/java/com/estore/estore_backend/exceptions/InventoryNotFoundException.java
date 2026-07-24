package com.estore.estore_backend.exceptions;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(Long productId) {
        super("Inventaire introuvable pour le produit avec ID: " + productId);
    }
}
