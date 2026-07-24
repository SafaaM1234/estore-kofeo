package com.estore.estore_backend.shopping.service;

import com.estore.estore_backend.catalog.dao.ProductRepository;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.customer.dao.UserRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.exceptions.CartItemNotFoundException;
import com.estore.estore_backend.exceptions.CartNotFoundException;
import com.estore.estore_backend.exceptions.ProductNotFoundException;
import com.estore.estore_backend.exceptions.UserNotFoundException;
import com.estore.estore_backend.shopping.dao.*;
import com.estore.estore_backend.shopping.dto.*;
import com.estore.estore_backend.shopping.entity.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ShoppingService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    //convert CartItem to CartItemDto
    private CartItemDto toItemDto(CartItem item) {
        return new CartItemDto(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice()
        );
    }
    // Convert Cart to CartDTO
    private CartDto toCartDto(Cart cart) {
        List<CartItemDto> items = cart.getItems().stream()
                .map(this::toItemDto)
                .toList();
        return new CartDto(cart.getId(), cart.getCreatedAt(), cart.getUser().getId(), cart.getTotalAmount(), items);
    }

    // 🔄 Méthode utilitaire pour recalculer le total du panier
    private void recalculateCartTotal(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                .sum();
        cart.setTotalAmount(total);
        cartRepository.save(cart);
    }

    // Créer un panier
    public CartDto createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur introuvable avec ID: " + userId));
        Cart cart = new Cart(user, new ArrayList<>());
        return toCartDto(cartRepository.save(cart));
    }

    // Récupérer le panier d’un utilisateur
    public CartDto getCartByUser(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Panier introuvable pour l'utilisateur ou ID: " + userId));
        return toCartDto(cart);
    }

    // Ajouter un produit au panier
    public CartItemDto addItem(Long cartId, CartItemDto itemDto) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Panier introuvable pour l'utilisateur ou ID: " + cartId));

        Product product = productRepository.findById(itemDto.getProductId())
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable avec ID: " + itemDto.getProductId()));

        if (itemDto.getQuantity() <= 0) {
            throw new IllegalArgumentException("La quantité doit être supérieure à zéro.");
        }

        CartItem item = new CartItem(itemDto.getQuantity(), itemDto.getUnitPrice(), cart, product);
        CartItem saved = cartItemRepository.save(item);

        recalculateCartTotal(cart);
        return toItemDto(saved);
    }

    // Modifier la quantité d’un item existant
    public CartItemDto updateItemQuantity(Long itemId, int newQuantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new CartItemNotFoundException("Item introuvable dans le panier avec ID: " + itemId));

        if (newQuantity <= 0) {
            throw new IllegalArgumentException("La quantité doit être supérieure à zéro.");
        }

        item.setQuantity(newQuantity);
        CartItem updated = cartItemRepository.save(item);
        recalculateCartTotal(updated.getCart());
        return toItemDto(updated);
    }

    // Supprimer un item
    public void removeItem(Long itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new CartItemNotFoundException("Item introuvable avec ID: " + itemId));

        Cart cart = item.getCart();
        cartItemRepository.delete(item);

        recalculateCartTotal(cart);
    }

    // Vider le panier
    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Panier introuvable avec ID: " + cartId));

        cartItemRepository.deleteAll(cart.getItems());
        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }
}