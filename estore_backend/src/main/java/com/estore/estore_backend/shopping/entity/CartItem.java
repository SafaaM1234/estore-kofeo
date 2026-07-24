package com.estore.estore_backend.shopping.entity;

import com.estore.estore_backend.catalog.entity.Product;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "cart_item")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private int quantity;
    @NotNull(message = "Le prix unitaire est obligatoire")
    @DecimalMin(value = "0.01", message = "Le prix unitaire doit être supérieur à 0")
    private Double unitPrice;

    @NotNull(message = "Le panier est obligatoire")
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;


    @NotNull(message = "Le produit est obligatoire")
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public CartItem() { }

    public CartItem(int quantity, Double unitPrice, Cart cart, Product product) {
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.cart = cart;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                ", cart=" + cart +
                ", product=" + product +
                '}';
    }
}
