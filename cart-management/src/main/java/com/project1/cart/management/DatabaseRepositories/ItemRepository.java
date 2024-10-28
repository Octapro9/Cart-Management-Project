package com.project1.cart.management.DatabaseRepositories;

//public class ItemRepository {
//}
import com.project1.cart.management.DatabaseClasses.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // Custom query methods (if needed)
}
