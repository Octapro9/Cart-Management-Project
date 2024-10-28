package com.project1.cart.management.DatabaseRepositories;

//public class UserRepository {
//}
import com.project1.cart.management.DatabaseClasses.User;
import com.project1.cart.management.DatabaseClasses.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    // Custom query methods (if needed)
    List<User> findByUserType(UserType userType);



}
