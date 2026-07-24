package com.estore.estore_backend.review.dto;

public class ProductRatingDto {
    private double averageRating;
    private long totalReviews;

    public ProductRatingDto() {}

    public ProductRatingDto(double averageRating, long totalReviews) {
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    @Override
    public String toString() {
        return "ProductRatingDto{" +
                "averageRating=" + averageRating +
                ", totalReviews=" + totalReviews +
                '}';
    }
}
