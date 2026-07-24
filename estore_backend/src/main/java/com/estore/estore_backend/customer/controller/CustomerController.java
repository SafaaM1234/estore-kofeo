package com.estore.estore_backend.customer.controller;

import com.estore.estore_backend.customer.dao.UserRepository;
import com.estore.estore_backend.customer.dto.*;
import com.estore.estore_backend.customer.dto.*;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final UserRepository userRepository;

    public CustomerController(CustomerService customerService,
                              UserRepository userRepository) {
        this.customerService = customerService;
        this.userRepository = userRepository;
    }
    //Recuperer tous les clients
    @GetMapping
    public ResponseEntity<List<User>> getAllCustomers() {
        List<User> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    //Recuperer utilisateur par son id
    @GetMapping("/{id}")
    public ResponseEntity<User> getCustomerById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        return ResponseEntity.ok(user);
    }
    //Mise à jour du profil
    @PutMapping("/{userId}/profile")
    public ResponseEntity<AuthResponse> updateProfile(@PathVariable Long userId,@Valid @RequestBody UpdateProfileRequest req) {
        return ResponseEntity.ok(customerService.updateProfile(userId, req));
    }

    //Suppression du profil
    @DeleteMapping("/profile/{profileId}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long profileId) {
        customerService.deleteProfile(profileId);
        return ResponseEntity.ok("Profil supprime avec succes !");
    }
}

