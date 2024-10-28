package com.project1.cart.management.Services;

//public class ItemService {
//}

import com.project1.cart.management.DatabaseClasses.Item;
import com.project1.cart.management.DatabaseRepositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Method to fetch all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Additional methods for managing items can be added here
}

