package com.project1.cart.management.Services;

import com.project1.cart.management.DatabaseClasses.Cart;
import com.project1.cart.management.DatabaseClasses.Item;
import com.project1.cart.management.DatabaseClasses.User;
import com.project1.cart.management.DatabaseRepositories.CartRepository;
import com.project1.cart.management.DatabaseRepositories.ItemRepository;
import com.project1.cart.management.DatabaseRepositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private final CartRepository cartRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ItemRepository itemRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    // 1. Add an item to the user's cart
    public Cart addItemToCart(Long userId, Long itemId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));


//        if(quantity == null || quantity <= 0){
//            quantity = 1;
//        } This Shit ain't working !!!

        // Check if the item already exists in the user's cart
        Optional<Cart> existingCart = cartRepository.findByUserAndItem(user, item);

        Cart cart;
        if (existingCart.isPresent()) {
            // Update the quantity if the item exists in the cart
            cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + quantity);  // Update the quantity
        } else {
            // Add a new cart entry if the item is not already in the cart
            cart = new Cart();
            cart.setUser(user);
            cart.setItem(item);
            cart.setQuantity(quantity);
        }
        return cartRepository.save(cart);
    }

    // 2. Delete an item from the user's cart
    public void removeItemFromCart(Long userId, Long itemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Find the cart entry with the specified user and item, and delete it
        Optional<Cart> cart = cartRepository.findByUserAndItem(user, item);
        cart.ifPresent(cartRepository::delete);
    }

    // 3. Update the quantity of an item in the cart
    public Cart updateItemQuantity(Long userId, Long itemId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Find the cart entry with the specified user and item
        Optional<Cart> cartOpt = cartRepository.findByUserAndItem(user, item);
        Cart cart = cartOpt.orElseThrow(() -> new RuntimeException("Item not found in cart"));

        // Update the quantity
        cart.setQuantity(quantity);
        return cartRepository.save(cart);
    }

    // 4. View all items in the user's cart
    public List<Cart> getCartItems(Long userId) {
        return cartRepository.findByUser_UserId(userId);
    }
}
// NORMAL USER : backend complete
//