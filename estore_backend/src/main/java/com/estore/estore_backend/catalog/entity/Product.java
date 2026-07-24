package com.estore.estore_backend.catalog.entity;

import com.estore.estore_backend.inventory.entity.Inventory;

import com.estore.estore_backend.review.entity.Review;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.List;

@Entity
@Table(name="product")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="le nom est obligatoire")
    @Size(max=50, message="Le nom ne doit pas depasser 50 caracteres")
    @Column(nullable = false, length=50)
    private String name;

    @NotNull(message = "Le prix est obligatoire")
    @DecimalMin(value = "0.01", message = "Le prix doit etre superieur àa 0")
    @Column(nullable = false)
    private Double price;
    @Size(max = 255, message = "La description ne doit pas dépasser 255 caractères")
    private String description;
    @Size(max = 255, message = "L'URL de l'image ne doit pas dépasser 255 caractères")
    private String imageUrl;

    private Double averageRating;   // ⭐ note moyenne
    private Integer reviewCount;    // nombre d’avis
    private Integer salesCount;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @JsonManagedReference
    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private Inventory inventory;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    public Product() { }

    public Product(String name, Double price, String description, String imageUrl, Double averageRating, Integer reviewCount, Integer salesCount, Category category, Inventory inventory, List<Review> reviews) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.salesCount = salesCount;
        this.category = category;
        this.inventory = inventory;
        this.reviews = reviews;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getAverageRating() { return averageRating;}
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating;}

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) {this.reviewCount = reviewCount; }

    public Integer getSalesCount() {return salesCount;}
    public void setSalesCount(Integer salesCount) {this.salesCount = salesCount;}

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }

    public Inventory getInventory() {
        return inventory;
    }
    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", category=" + category +
                ", inventory=" + inventory +
                '}';
    }
}

