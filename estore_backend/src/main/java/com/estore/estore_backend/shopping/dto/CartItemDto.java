package com.estore.estore_backend.shopping.dto;

import jakarta.validation.constraints.*;

public class CartItemDto {
    private Long productId;
    @NotBlank(message = "Le nom du produit est obligatoire")
    private String productName;
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private int quantity;
    @NotNull(message = "Le prix unitaire est obligatoire")
    @DecimalMin(value = "0.01", message = "Le prix unitaire doit être supérieur à 0")
    private Double unitPrice;
    public CartItemDto() {}

    public CartItemDto(Long productId, String productName, int quantity, Double unitPrice) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }

    @Override
    public String toString() {
        return "CartItemDto{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                '}';
    }
}
