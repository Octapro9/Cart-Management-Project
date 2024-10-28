package com.project1.cart.management.Services;
import com.project1.cart.management.DatabaseClasses.User;
import com.project1.cart.management.DatabaseRepositories.UserRepository;
import com.project1.cart.management.Dto.UserRegistrationDto;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    private EncryptionService encryptionService;
//    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
//        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    //  Register User:
    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("User with this email already exists.");
        }

        User user = new User();
        user.setName(registrationDto.getName());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(encryptionService.encryptPassword(registrationDto.getPassword()));  // Hash password
        user.setUserType(registrationDto.getUserType());

        return userRepository.save(user);
    }

    //  User Login Method:
    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (encryptionService.verifyPassword(password, user.getPassword() ) ) {
            return user;  // User authenticated
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
    // Add this method to UserService
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
