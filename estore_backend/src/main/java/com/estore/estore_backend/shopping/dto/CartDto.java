package com.estore.estore_backend.shopping.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.List;

public class CartDto {
    private Long id;
    private LocalDateTime createdAt;
    @NotNull(message = "L'utilisateur est obligatoire")
    private Long userId;
    @PositiveOrZero(message = "Le montant total doit être positif ou nul")
    @DecimalMin(value = "0.0", inclusive = true, message = "Le montant total doit être positif ou nul")
    private Double totalAmount;
    @NotNull(message = "La liste des items ne peut pas être nulle")
    private List<CartItemDto> items;

    public CartDto() {}

    public CartDto(Long id, LocalDateTime createdAt, Long userId, Double totalAmount, List<CartItemDto> items) {
        this.id = id;
        this.createdAt = createdAt;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }

    @Override
    public String toString() {
        return "CartDto{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", userId=" + userId +
                ", totalAmount=" + totalAmount +
                ", items=" + items +
                '}';
    }
}
