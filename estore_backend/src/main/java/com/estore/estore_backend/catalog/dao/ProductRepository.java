package com.estore.estore_backend.catalog.dao;

import com.estore.estore_backend.catalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByNameContaining(String keyword);
    List<Product> findByCategoryId(Long categoryId);
    boolean existsByName(String name);
    List<Product> findTop4ByOrderBySalesCountDesc();
    List<Product> findTop4ByOrderByAverageRatingDesc();
}
