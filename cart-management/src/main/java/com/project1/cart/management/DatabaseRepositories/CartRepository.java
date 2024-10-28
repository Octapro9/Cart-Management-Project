package com.project1.cart.management.DatabaseRepositories;

import com.project1.cart.management.DatabaseClasses.Cart;
import com.project1.cart.management.DatabaseClasses.Item;
import com.project1.cart.management.DatabaseClasses.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserAndItem(User user, Item item);
    List<Cart> findByUser_UserId(Long userId);
    List<Cart> findByUser(User user);  // Retrieve all cart items for a specific user
    Cart findByUserAndItemItemId(User user, Long itemId);  // Retrieve a specific cart item by user and item
}
