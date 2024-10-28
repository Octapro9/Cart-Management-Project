package com.project1.cart.management.Dto;

//package com.project1.cart.management.Dto;

import com.project1.cart.management.DatabaseClasses.Cart;
import com.project1.cart.management.DatabaseClasses.User;

import java.util.List;

public class UserCartDto {
    private User user;
    private List<Cart> carts;

    public UserCartDto(User user, List<Cart> carts) {
        this.user = user;
        this.carts = carts;
    }

    // Getters and Setters

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }
}
