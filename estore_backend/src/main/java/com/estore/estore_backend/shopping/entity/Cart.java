package com.estore.estore_backend.shopping.entity;
import com.estore.estore_backend.customer.entity.User;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cart")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DecimalMin(value = "0.0", inclusive = true, message = "Le montant total doit être positif ou nul")
    private Double totalAmount;
    private LocalDateTime createdAt;

    @JsonBackReference
    @NotNull(message = "Le panier doit être associé à un utilisateur")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> items;

    public Cart() { }

    @PrePersist
    public void onCreate(){
        this.createdAt=LocalDateTime.now();
    }

    public Cart(User user, List<CartItem> items) {
        this.user = user;
        this.items = items;
        this.totalAmount = 0.0;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }
    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", totalAmount=" + totalAmount +
                ", createdAt=" + createdAt +
                ", user=" + user +
                ", items=" + items +
                '}';
    }
}

