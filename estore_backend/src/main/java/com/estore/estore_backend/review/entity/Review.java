package com.estore.estore_backend.review.entity;

import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.customer.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "review", uniqueConstraints = {
                @UniqueConstraint(name = "uk_review_user_product", columnNames = {"user_id", "product_id"})
            }
        )
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1, message = "La note doit être >= 1")
    @Max(value = 5, message = "La note doit être <= 5")
    @Column(nullable=false)
    private int rating; // 1 à 5

    @NotBlank(message = "Le commentaire est obligatoire")
    @Size(min = 3, max = 500, message = "Le commentaire doit contenir entre 3 et 500 caractères")
    @Column(nullable=false, length=500)
    private String comment;

    @Column(nullable=false)
    private LocalDateTime createdAt;

    @Column(nullable=false)
    private boolean approved;

    /** Indique si l'utilisateur a acheté le produit (commande validée contenant ce produit). */
    @Column(nullable = false)
    private boolean verifiedPurchase = false;

    @NotNull(message = "L'utilisateur est obligatoire")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Le produit est obligatoire")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Review() {}

    public Review(Product product, User user, int rating, String comment) {
        this.product = product;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = LocalDateTime.now();
        this.approved = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id;}

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    /** Expose l'identifiant utilisateur pour alignement avec le modèle métier (userId). */
    public Long getUserId() {
        return user != null ? user.getId() : null;
    }

    /** Expose l'identifiant produit pour alignement avec le modèle métier (productId). */
    public Long getProductId() {
        return product != null ? product.getId() : null;
    }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }

    public boolean isVerifiedPurchase() { return verifiedPurchase; }
    public void setVerifiedPurchase(boolean verifiedPurchase) { this.verifiedPurchase = verifiedPurchase; }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", createdAt=" + createdAt +
                ", approved=" + approved +
                ", verifiedPurchase=" + verifiedPurchase +
                ", user=" + user +
                ", product=" + product +
                '}';
    }
}
