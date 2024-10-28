package com.project1.cart.management.Controllers;


import com.project1.cart.management.DatabaseClasses.Cart;
import com.project1.cart.management.Dto.CartRequest;
import com.project1.cart.management.Services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add an item to the cart
    @PostMapping("/add")
    public ResponseEntity<Cart> addItemToCart(@RequestBody CartRequest cartRequest) {
        Cart cart = cartService.addItemToCart(cartRequest.getUserId(), cartRequest.getItemId(), cartRequest.getQuantity());
        return ResponseEntity.ok(cart);
    } // working fine


    // Get all items in the user's cart
    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCartItems(@PathVariable Long userId) {
        List<Cart> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    } // working fine

    // Update the quantity of an item in the cart
    @PutMapping("/update")
    public ResponseEntity<Cart> updateItemQuantity(@RequestBody CartRequest cartRequest) {
        Cart updatedCart = cartService.updateItemQuantity(cartRequest.getUserId(), cartRequest.getItemId(), cartRequest.getQuantity());
        return ResponseEntity.ok(updatedCart);
    } // to check

    // Remove an item from the cart
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeItemFromCart(@RequestBody CartRequest cartRequest) {
        cartService.removeItemFromCart(cartRequest.getUserId(), cartRequest.getItemId());
        return ResponseEntity.noContent().build();
    } //working fine.


}

//TO DO:
// set the minimum quantity to 1 (maybe we can use front-end for that purpose)