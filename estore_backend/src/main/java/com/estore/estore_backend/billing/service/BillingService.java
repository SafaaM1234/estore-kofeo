package com.estore.estore_backend.billing.service;

import com.estore.estore_backend.billing.dao.*;
import com.estore.estore_backend.billing.dto.*;
import com.estore.estore_backend.billing.entity.*;
import com.estore.estore_backend.catalog.dao.ProductRepository;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.customer.dao.UserRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.exceptions.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillingService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public BillingService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    //covertir OrderItem to OrderItemDto
    private OrderItemDto toItemDTO(OrderItem item) {
        return new OrderItemDto(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice()
        );
    }

    //convertir Order to OrderDto
    private OrderDto toOrderDTO(Order order) {
        List<OrderItemDto> items = order.getItems().stream()
                .map(this::toItemDTO)
                .toList();
        return new OrderDto(
                order.getId(),
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getUser().getId(),
                items
        );
    }

    // Créer une commande
    public OrderDto createOrder(User user, OrderDto orderDto) {
        List<OrderItem> items = orderDto.getItems().stream()
                .map(dto -> {
                    Product product = productRepository.findById(dto.getProductId())
                            .orElseThrow(() -> new ProductNotFoundException("Produit introuvable avec ID: " + dto.getProductId()));
                    return new OrderItem(dto.getQuantity(), dto.getUnitPrice(), null, product);
                })
                .toList();

        Order order = new Order(orderDto.getTotalAmount(), orderDto.getStatus(), user, items);
        for (OrderItem item : items) {
            item.setOrder(order);
        }
        Order saved = orderRepository.save(order);
        return toOrderDTO(saved);
    }

    // Valider une commande (création avec statut VALIDATED)
    public OrderDto validateOrder(User user, List<OrderItem> items) {
        if (items == null || items.isEmpty()) {
            throw new IllegalStateException("Impossible de valider une commande sans items.");
        }

        double total = items.stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();

        Order order = new Order(total, "VALIDATED", user, items);
        for (OrderItem item : items) {
            item.setOrder(order);
        }
        Order saved = orderRepository.save(order);
        return toOrderDTO(saved);
    }

    // Récupérer une commande par ID
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Commande introuvable avec ID: " + orderId));
        return toOrderDTO(order);
    }

    // Récupérer les commandes d’un utilisateur
    public List<OrderDto> getOrdersByUser(Long userId) {
        // Vérifier si l’utilisateur existe
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("Utilisateur introuvable avec ID: " + userId);
        }

        List<Order> orders = orderRepository.findByUserId(userId);
        // Vérifier si l’utilisateur a des commandes
        if (orders.isEmpty()) {
            throw new NoOrdersFoundException("Aucune commande trouvée pour l’utilisateur avec ID: " + userId);
        }

        return orders.stream()
                .map(this::toOrderDTO)
                .toList();
    }

    // Historique des commandes (ex: VALIDATED uniquement)
    public List<OrderDto> getOrderHistory(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("Utilisateur introuvable avec ID: " + userId);
        }

        List<Order> orders = orderRepository.findByUserId(userId)
                .stream()
                .filter(order -> "VALIDATED".equals(order.getStatus())) // ✅ filtrer par statut
                .collect(Collectors.toList());

        if (orders.isEmpty()) {
            throw new NoOrdersFoundException("Aucune commande validée trouvée pour l’utilisateur avec ID: " + userId);
        }

        return orders.stream()
                .map(this::toOrderDTO)
                .collect(Collectors.toList());
    }


    // Ajouter un item
    public OrderItemDto addOrderItem(Long orderId, Long productId, int quantity, Double unitPrice) {
        // Vérifier la commande
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Commande introuvable avec ID: " + orderId));

        // Vérifier le produit
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable avec ID: " + productId));

        // Vérifier la quantité
        if (quantity <= 0) {
            throw new IllegalArgumentException("La quantité doit être supérieure à zéro.");
        }

        // Créer et sauvegarder l’item
        OrderItem item = new OrderItem(quantity, unitPrice, order, product);
        OrderItem saved = orderItemRepository.save(item);

        // Recalculer le montant total de la commande
        double total = order.getItems().stream()
                .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                .sum();
        order.setTotalAmount(total);
        orderRepository.save(order);

        return toItemDTO(saved);
    }

    // Modifier la quantité d’un item
    public OrderItemDto updateItemQuantity(Long itemId, int newQuantity) {
        OrderItem item = orderItemRepository.findById(itemId)
                .orElseThrow(() -> new OrderItemNotFoundException("Item introuvable dans la commande avec ID: " + itemId));

        if (newQuantity <= 0) {
            throw new IllegalArgumentException("La quantité doit être supérieure à zéro.");
        }
        item.setQuantity(newQuantity);
        OrderItem updated = orderItemRepository.save(item);

        Order order = updated.getOrder();
        double total = orderItemRepository.findByOrderId(order.getId()).stream()
                .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                .sum();
        order.setTotalAmount(total);
        orderRepository.save(order);

        return toItemDTO(updated);
    }

    // Supprimer un item
    public void removeOrderItem(Long itemId) {
        OrderItem item = orderItemRepository.findById(itemId)
                .orElseThrow(() -> new OrderItemNotFoundException("Item introuvable dans la commande avec ID: " + itemId));

        Order order = item.getOrder();
        Long orderId = order.getId();
        orderItemRepository.delete(item);
        double total = orderItemRepository.findByOrderId(orderId).stream()
                .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                .sum();
        order.setTotalAmount(total);
        orderRepository.save(order);
    }

    // Mettre à jour le statut d’une commande
    public OrderDto updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Commande introuvable avec ID: " + orderId));
        order.setStatus(newStatus);
        Order updated = orderRepository.save(order);
        return toOrderDTO(updated);
    }


}
