package com.estore.estore_backend.review.service;

import com.estore.estore_backend.catalog.dao.ProductRepository;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.customer.dao.UserRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.exceptions.*;
import com.estore.estore_backend.review.dao.ReviewRepository;
import com.estore.estore_backend.review.dto.*;
import com.estore.estore_backend.review.entity.Review;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // MAPPER
    private ReviewResponseDto mapToDto(Review r) {
        ReviewResponseDto dto = new ReviewResponseDto();
        dto.setId(r.getId());
        dto.setUserId(r.getUserId());
        dto.setUserFirstName(r.getUser().getFirstName());
        dto.setUserLastName(r.getUser().getLastName());
        dto.setProductId(r.getProductId());
        dto.setRating(r.getRating());
        dto.setComment(r.getComment());
        dto.setApproved(r.isApproved());
        dto.setVerifiedPurchase(r.isVerifiedPurchase());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setAverageRating(reviewRepository.averageRatingByProductId(r.getProductId()));
        dto.setReviewCount(reviewRepository.countApprovedByProductId(r.getProductId()));
        return dto;
    }

    // CREATE REVIEW
    public ReviewResponseDto createReview(ReviewRequestDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new UserNotFoundException("Utilisateur introuvable avec ID: " + dto.getUserId()));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable avec ID: "+ dto.getProductId()));

        if (reviewRepository.existsByUser_IdAndProduct_Id(dto.getUserId(), dto.getProductId())) {
            throw new ReviewAlreadyExistsException("Review deja exist");
        }

        boolean hasPurchased = user.getOrders().stream()
                .anyMatch(order -> "VALIDATED".equals(order.getStatus()) &&
                        order.getItems().stream()
                                .anyMatch(item ->
                                        item.getProduct().getId().equals(product.getId())
                                )
                );

        if (!hasPurchased) {
            throw new PurchaseRequiredException("Utilisateur doit acheter le produit avant faire review ");
        }

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setApproved(true);
        review.setVerifiedPurchase(true);

        return mapToDto(reviewRepository.save(review));
    }

    // GET REVIEWS (SANS PAGINATION)
    public List<ReviewResponseDto> getReviewsByProduct(Long productId) {

        if (!productRepository.existsById(productId)) {
            throw new ProductNotFoundException("Produit introuvable avec ID: "+ productId );
        }

        return reviewRepository
                .findByProduct_IdAndApprovedTrueOrderByCreatedAtDesc(productId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // AVERAGE RATING
    public ProductRatingDto getProductRating(Long productId) {

        if (!productRepository.existsById(productId)) {
            throw new ProductNotFoundException("Produit introuvable avec ID: "+ productId );
        }

        double avg = reviewRepository.averageRatingByProductId(productId);
        long count = reviewRepository.countApprovedByProductId(productId);

        return new ProductRatingDto(avg, count);
    }

    // ️ UPDATE
    public ReviewResponseDto updateReview(Long id, ReviewRequestDto dto) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review introuvable avec ID :" + id));

        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        return mapToDto(reviewRepository.save(review));
    }

    // DELETE
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException("Review introuvable avec ID :" + id);
        }
        reviewRepository.deleteById(id);
    }
}
