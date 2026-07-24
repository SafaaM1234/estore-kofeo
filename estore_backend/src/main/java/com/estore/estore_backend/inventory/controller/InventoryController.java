package com.estore.estore_backend.inventory.controller;

import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Recuperer inventory d'un produit
    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getInventory(@PathVariable Long productId) {
        Inventory inventory = inventoryService.getInventoryByProduct(productId);
        return ResponseEntity.ok(inventory);
    }

    //Creer un inventaire
    @PostMapping
    public ResponseEntity<Inventory> createInventory(@Valid @RequestBody Inventory inventory) {
        Inventory created = inventoryService.createInventory(inventory);
        return ResponseEntity.ok(created);
    }

    // Decrementer stock
    @PutMapping("/{productId}/decrease/{quantity}")
    public ResponseEntity<String> decreaseStock(@PathVariable Long productId, @PathVariable int quantity) {
        inventoryService.decreaseStock(productId, quantity);
        return ResponseEntity.ok("Stock decremente avec succes.");
    }

    // Incrementer stock
    @PutMapping("/{productId}/increase/{quantity}")
    public ResponseEntity<String> increaseStock(@PathVariable Long productId, @PathVariable int quantity) {
        inventoryService.increaseStock(productId, quantity);
        return ResponseEntity.ok("Stock incremente avec succes.");
    }

    //Supprimer l'inventaire
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteInventory(@PathVariable Long productId) {
        boolean deleted = inventoryService.deleteInventory(productId);
        if (deleted) {
            return ResponseEntity.ok("Inventaire supprimé avec succès.");
        } else {
            return ResponseEntity.status(404).body("Aucun inventaire trouvé pour ce produit.");
        }
    }
}
