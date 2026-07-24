package com.estore.estore_backend.billing.controller;

import com.estore.estore_backend.billing.dto.*;
import com.estore.estore_backend.billing.entity.OrderItem;
import com.estore.estore_backend.billing.service.BillingService;
import com.estore.estore_backend.customer.dao.UserRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.exceptions.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class BillingController {

    private final BillingService billingService;
    private final UserRepository userRepository;
    public BillingController(BillingService billingService, UserRepository userRepository) {
        this.billingService = billingService;
        this.userRepository=userRepository;
    }

    // Créer une commande
    @PostMapping("/create/{userId}")
    public ResponseEntity<OrderDto> createOrder(@PathVariable Long userId,
                                                @Valid @RequestBody OrderDto orderDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur introuvable avec ID: " + userId));

        OrderDto order = billingService.createOrder(user, orderDto);
        return ResponseEntity.ok(order);
    }

    // Valider une commande (statut fixé à VALIDATED)
    @PostMapping("/validate/{userId}")
    public ResponseEntity<OrderDto> validateOrder(@PathVariable Long userId,
                                                  @RequestBody @Valid List<OrderItem> items) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur introuvable avec ID: " + userId));

        OrderDto validatedOrder = billingService.validateOrder(user, items);
        return ResponseEntity.ok(validatedOrder);
    }

    // Récupérer une commande par ID
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(billingService.getOrderById(orderId));
    }

    // Récupérer les commandes d’un utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(billingService.getOrdersByUser(userId));
    }

    // Historique des commandes validées
    @GetMapping("/user/{userId}/history")
    public ResponseEntity<List<OrderDto>> getOrderHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(billingService.getOrderHistory(userId));
    }

    // Ajouter un item
    @PostMapping("/{orderId}/add/{productId}")
    public ResponseEntity<OrderItemDto> addOrderItem(@PathVariable Long orderId, @RequestBody @Valid OrderItemDto itemDto) {
        OrderItemDto item = billingService.addOrderItem(orderId,itemDto.getProductId(), itemDto.getQuantity(), itemDto.getUnitPrice());
        return ResponseEntity.ok(item);
    }

    // Modifier la quantité d’un item
    @PutMapping("/item/{itemId}/update/{quantity}")
    public ResponseEntity<OrderItemDto> updateItemQuantity(@PathVariable Long itemId,
                                                           @PathVariable int quantity) {
        OrderItemDto updatedItem = billingService.updateItemQuantity(itemId, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    // Supprimer un item
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<String> removeOrderItem(@PathVariable Long itemId) {
        billingService.removeOrderItem(itemId);
        return ResponseEntity.ok("Item supprimé avec succès.");
    }

    // Mettre à jour le statut d’une commande
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long orderId,
                                                      @RequestParam String status) {
        return ResponseEntity.ok(billingService.updateOrderStatus(orderId, status));
    }
}
