package com.estore.estore_backend.review.dao;

import com.estore.estore_backend.review.entity.Review;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProduct_IdAndApprovedTrueOrderByCreatedAtDesc(Long productId);

    boolean existsByUser_IdAndProduct_Id(Long userId, Long productId);

    @Query("SELECT COALESCE(AVG(r.rating), 0.0) FROM Review r WHERE r.product.id = :productId AND r.approved = true")
    double averageRatingByProductId(@Param("productId") Long productId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.product.id = :productId AND r.approved = true")
    long countApprovedByProductId(@Param("productId") Long productId);
}
