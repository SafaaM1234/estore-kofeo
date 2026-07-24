package com.estore.estore_backend.catalog.service;

import com.estore.estore_backend.catalog.dao.*;
import com.estore.estore_backend.catalog.entity.*;
import com.estore.estore_backend.exceptions.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CatalogService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public CatalogService(ProductRepository productRepository, CategoryRepository categoryRepository){
        this.productRepository=productRepository;
        this.categoryRepository=categoryRepository;
    }

    //pour Product:
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long productId){
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable avec l'id : " + productId));
    }

    public List<Product> searchProductsByName(String keyword) {
        List<Product> products = productRepository.findByNameContaining(keyword);
        if (products.isEmpty()) {
            throw new ProductNotFoundException("Aucun produit trouve avec le mot-cle : " + keyword);
        }
        return products;
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new CategoryNotFoundException("Categorie introuvable!");
        }
        return productRepository.findByCategoryId(categoryId);
    }

    public Product addProduct(Product nproduct) {
        if (productRepository.existsByName(nproduct.getName())) {
            throw new ProductAlreadyExistsException("Produit deja existant !");
        }
        if (nproduct.getCategory() == null || nproduct.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category ID is required");
        }
        Category category = categoryRepository.findById(nproduct.getCategory().getId())
                .orElseThrow(() -> new CategoryNotFoundException(
                        "Categorie introuvable avec ID: " + nproduct.getCategory().getId()
                ));

        Product product = new Product();
        product.setName(nproduct.getName());
        product.setPrice(nproduct.getPrice());
        product.setDescription(nproduct.getDescription());
        product.setImageUrl(nproduct.getImageUrl());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product updatedProduct) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable !"));

        //vérifier duplication du nom
        if (updatedProduct.getName() != null &&
                !updatedProduct.getName().equals(product.getName()) &&
                productRepository.existsByName(updatedProduct.getName())) {

            throw new ProductAlreadyExistsException("Un produit avec ce nom existe deja.");
        }

        //vérifier category
        if (updatedProduct.getCategory() == null || updatedProduct.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category ID is required");
        }

        Category category = categoryRepository.findById(updatedProduct.getCategory().getId())
                .orElseThrow(() -> new CategoryNotFoundException(
                        "Categorie introuvable avec ID: " + updatedProduct.getCategory().getId()
                ));

        //update champs
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setDescription(updatedProduct.getDescription());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ProductNotFoundException("Produit introuvable !");
        }
        productRepository.deleteById(productId);
    }

    public List<Product> getBestSellers() {
        // Exemple : par ventes
        return productRepository.findTop4ByOrderBySalesCountDesc();
    }


    //pour Category:
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Categorie introuvable!"));
    }

    public Category addCategory(Category category) {
        if (categoryRepository.findByName(category.getName()).isPresent()) {
            throw new CategoryAlreadyExistsException("Categorie deja existante !");
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long categoryId, Category updatedCategory) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Catégorie introuvable !"));

        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new CategoryNotFoundException("Catégorie introuvable !");
        }
        categoryRepository.deleteById(categoryId);
    }

}

