package com.estore.estore_backend.billing.dto;

import com.estore.estore_backend.billing.entity.OrderItem;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
    private Long id;
    private LocalDateTime orderDate;
    @DecimalMin(value = "0.0", inclusive = true, message = "Le montant total doit être positif")
    private Double totalAmount;
    @NotBlank(message = "Le statut est obligatoire")
    private String status;
    @NotNull(message = "L'utilisateur est obligatoire")
    private Long userId;
    @NotEmpty(message = "La commande doit contenir au moins un item")
    private List<@Valid OrderItemDto> items;

    public OrderDto() {}

    public OrderDto(Long id, LocalDateTime orderDate, Double totalAmount, String status, Long userId, List<OrderItemDto> items) {
        this.id = id;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.userId = userId;
        this.items = items;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public List<OrderItemDto> getItems() { return items; }
    public void setItems(List<OrderItemDto> items) { this.items = items; }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + id +
                ", orderDate=" + orderDate +
                ", totalAmount=" + totalAmount +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                ", items=" + items +
                '}';
    }
}
