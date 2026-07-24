package com.estore.estore_backend.shopping.controller;

import com.estore.estore_backend.shopping.dto.*;
import com.estore.estore_backend.shopping.service.ShoppingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/cart")
public class ShoppingController {

    private final ShoppingService shoppingService;

    public ShoppingController(ShoppingService shoppingService) {
        this.shoppingService = shoppingService;
    }

    // Créer un panier
    @PostMapping("/create/{userId}")
    public ResponseEntity<CartDto> createCart(@PathVariable Long userId) {
        CartDto cart = shoppingService.createCart(userId);
        return ResponseEntity.ok(cart);
    }

    // Récupérer le panier d’un utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDto> getCartByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(shoppingService.getCartByUser(userId));
    }

    // Ajouter un produit au panier
    @PostMapping("/{cartId}/add/{productId}")
    public ResponseEntity<CartItemDto> addItem(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @Valid @RequestBody CartItemDto itemDto) {
        if (!Objects.equals(productId, itemDto.getProductId())) {
            throw new IllegalArgumentException("L'identifiant produit dans l'URL et le corps doivent correspondre.");
        }
        CartItemDto item = shoppingService.addItem(cartId, itemDto);
        return ResponseEntity.ok(item);
    }

    // ✅ Modifier la quantité d’un item
    @PutMapping("/item/{itemId}/update/{quantity}")
    public ResponseEntity<CartItemDto> updateItemQuantity(@PathVariable Long itemId, @Valid @RequestBody CartItemDto itemDto) {
        CartItemDto updatedItem = shoppingService.updateItemQuantity(itemId, itemDto.getQuantity());
        return ResponseEntity.ok(updatedItem);
    }

    // Supprimer un item
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<String> removeItem(@PathVariable Long itemId) {
        shoppingService.removeItem(itemId);
        return ResponseEntity.ok("Item supprimé avec succès.");
    }

    // Vider le panier
    @DeleteMapping("/{cartId}/clear")
    public ResponseEntity<String> clearCart(@PathVariable Long cartId) {
        shoppingService.clearCart(cartId);
        return ResponseEntity.ok("Panier vidé avec succès.");
    }
}
