package com.estore.estore_backend.review.dto;

import jakarta.validation.constraints.*;

public class ReviewRequestDto {

    @NotNull
    private Long userId;

    @NotNull
    private Long productId;

    @Min(value = 1)
    @Max(value = 5)
    private int rating;

    @NotBlank
    @Size(min = 3, max = 500)
    private String comment;

    public ReviewRequestDto() { }

    public ReviewRequestDto(Long userId, Long productId, int rating, String comment) {
        this.userId = userId;
        this.productId = productId;
        this.rating = rating;
        this.comment = comment;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    @Override
    public String toString() {
        return "ReviewRequestDto{" +
                "userId=" + userId +
                ", productId=" + productId +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                '}';
    }
}
