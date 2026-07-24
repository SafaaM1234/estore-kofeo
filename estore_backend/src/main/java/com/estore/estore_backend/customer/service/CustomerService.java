package com.estore.estore_backend.customer.service;


import com.estore.estore_backend.billing.dao.OrderRepository;
import com.estore.estore_backend.customer.dao.*;
import com.estore.estore_backend.customer.dto.*;
import com.estore.estore_backend.customer.entity.*;
import com.estore.estore_backend.exceptions.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(UserRepository userRepository, ProfileRepository profileRepository, PasswordEncoder passwordEncoder, OrderRepository orderRepository){
        this.userRepository=userRepository;
        this.profileRepository=profileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException("Email deja utilise !");

        }

        User user = new User();
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        Profile profile = new Profile();
        profile.setPhone(req.getPhone());
        profile.setAddress(req.getAddress());
        profile.setCity(req.getCity());
        profile.setCountry(req.getCountry());
        profile.setUser(user);
        user.setProfile(profile);

        userRepository.save(user);
        return new AuthResponse("Inscription reussie", user.getEmail(), user.getId());
    }


    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("Email incorrect"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Mot de passe incorrect");
        }
        return new AuthResponse("Connexion reussie", user.getEmail(), user.getId());
    }

    public AuthResponse updateProfile(Long userId, UpdateProfileRequest req) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ProfileNotFoundException("Profil non trouve"));

        profile.setPhone(req.getPhone());
        profile.setAddress(req.getAddress());
        profile.setCity(req.getCity());
        profile.setCountry(req.getCountry());

        profileRepository.save(profile); // ✅ sauvegarde directe du profil

        return new AuthResponse("Profil mis a jour avec succes", profile.getUser().getEmail(), profile.getUser().getId());
    }

    public void deleteProfile(Long profileId) {
        if (!profileRepository.existsById(profileId)){
            throw new ProfileNotFoundException("Profil introuvable !");
        }
        profileRepository.deleteById(profileId);
    }

    public List<User> getAllCustomers() {
        return userRepository.findAll();
    }


    // 👤 GET USER
    public User getCustomerById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
    }
}
