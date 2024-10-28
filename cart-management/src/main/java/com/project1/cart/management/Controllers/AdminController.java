package com.project1.cart.management.Controllers;

import com.project1.cart.management.DatabaseClasses.Cart;
import com.project1.cart.management.DatabaseClasses.User;
import com.project1.cart.management.Dto.UserCartDto;
import com.project1.cart.management.Services.UserService;
import com.project1.cart.management.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @GetMapping("/users-with-carts")
    public ResponseEntity<List<UserCartDto>> getUsersWithCarts() {
        List<User> users = userService.getAllUsers();  // Implement this method in UserService
        List<UserCartDto> userCartList = users.stream()
                .map(user -> new UserCartDto(user, cartService.getCartItems(user.getUserId())))
                .toList();
        return ResponseEntity.ok(userCartList);
    }
}
