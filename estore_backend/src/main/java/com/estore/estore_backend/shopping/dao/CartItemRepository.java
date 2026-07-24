package com.estore.estore_backend.shopping.dao;

import com.estore.estore_backend.shopping.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {
}
