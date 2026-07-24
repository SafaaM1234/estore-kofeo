package com.estore.estore_backend.review.controller;

import com.estore.estore_backend.review.dto.*;
import com.estore.estore_backend.review.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // CREATE
    @PostMapping
    public ReviewResponseDto createReview(@RequestBody @Valid ReviewRequestDto dto) {
        return reviewService.createReview(dto);
    }

    // GET ALL REVIEWS PRODUCT
    @GetMapping("/product/{productId}")
    public List<ReviewResponseDto> getReviewByProduct(@PathVariable Long productId) {
        return reviewService.getReviewsByProduct(productId);
    }

    // AVERAGE RATING
    @GetMapping("/product/{productId}/rating")
    public ProductRatingDto getRating(@PathVariable Long productId) {
        return reviewService.getProductRating(productId);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ReviewResponseDto updateReview(@PathVariable("id") Long reviewId,
                                          @RequestBody @Valid ReviewRequestDto reqdto) {
        return reviewService.updateReview(reviewId, reqdto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
    }
}
