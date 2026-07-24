package com.estore.estore_backend.review.dto;

import java.time.LocalDateTime;

public class ReviewResponseDto {

    private Long id;
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private Long productId;

    private int rating;
    private String comment;

    private boolean approved;
    private boolean verifiedPurchase;

    private LocalDateTime createdAt;

    private double averageRating;
    private long reviewCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserFirstName() {return userFirstName;}

    public void setUserFirstName(String userFirstName) {this.userFirstName = userFirstName;}

    public String getUserLastName() {return userLastName;}

    public void setUserLastName(String userLastName) {this.userLastName = userLastName;}

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public boolean isVerifiedPurchase() {
        return verifiedPurchase;
    }

    public void setVerifiedPurchase(boolean verifiedPurchase) {
        this.verifiedPurchase = verifiedPurchase;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public long getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(long reviewCount) {
        this.reviewCount = reviewCount;
    }

    @Override
    public String toString() {
        return "ReviewResponseDto{" +
                "id=" + id +
                ", userId=" + userId +
                ", userFirstName"+ userFirstName+
                ", userLastName"+ userLastName+
                ", productId=" + productId +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", approved=" + approved +
                ", verifiedPurchase=" + verifiedPurchase +
                ", createdAt=" + createdAt +
                '}';
    }
}
