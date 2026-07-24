package com.estore.estore_backend.inventory.service;

import com.estore.estore_backend.exceptions.InsufficientStockException;
import com.estore.estore_backend.exceptions.InventoryNotFoundException;
import com.estore.estore_backend.inventory.dao.InventoryRepository;
import com.estore.estore_backend.inventory.entity.Inventory;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // Recuperer inventory d’un produit
    public Inventory getInventoryByProduct(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new InventoryNotFoundException(productId));
    }

    // Creer un inventaire pour un produit
    public Inventory createInventory(Inventory inventory) {
        if (inventory.getProduct() == null) {
            throw new IllegalArgumentException("Un inventaire doit etre associe a un produit.");
        }
        if (inventory.getQuantity() < 0) {
            throw new IllegalArgumentException("La quantite ne peut pas etre negative.");
        }
        return inventoryRepository.save(inventory);
    }

    // Decrementer le stock (reservation ou achat)
    public void decreaseStock(Long productId, int quantity) {
        Inventory inventory = getInventoryByProduct(productId);
        if (inventory.getQuantity() < quantity) {
            throw new InsufficientStockException(productId, quantity, inventory.getQuantity());
        }
        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventoryRepository.save(inventory);
    }

    // Incrementer le stock (ex: retour produit, reapprovisionnement)
    public void increaseStock(Long productId, int quantity) {
        Inventory inventory = getInventoryByProduct(productId);
        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventoryRepository.save(inventory);
    }

    // Supprimer inventory d'un produit
    public boolean deleteInventory(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .map(inventory -> {
                    inventoryRepository.delete(inventory);
                    return true; // suppression effectuée
                })
                .orElse(false); // aucun inventaire trouvé
    }
}
