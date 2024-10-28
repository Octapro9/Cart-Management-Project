package com.project1.cart.management.Controllers;

//public class UserController {
//}
//import com.project1.cart.management.DatabaseClasses.User;
//import com.project1.cart.management.DatabaseRepositories.UserRepository;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    private final UserRepository userRepository;
//
//    public UserController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
////    fetches all the users from the database.
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
////    if a user asks something to post or update in the db, @postMapping does that.
////    @requestBody tells the spring boot to take the JSON body of the post req. from user and convert it into User
////    object.
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userRepository.save(user);
//    }


import com.project1.cart.management.DatabaseClasses.User;
import com.project1.cart.management.Dto.LoginRequestDto;
import com.project1.cart.management.Dto.UserResponseDto;
import com.project1.cart.management.Services.UserService;
import com.project1.cart.management.Dto.UserRegistrationDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegistrationDto registrationDto) {
        try {
            userService.registerUser(registrationDto);
            return "User registered successfully!";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginDto) {
        try {
            User authenticatedUser = userService.loginUser(loginDto.getEmail(), loginDto.getPassword());
            UserResponseDto userResponseDto = new UserResponseDto(
                    authenticatedUser.getUserId(),
                    authenticatedUser.getName(),
                    authenticatedUser.getEmail(),
                    authenticatedUser.getUserType().name() // .name() converts enum to string.
            );
            return ResponseEntity.ok(userResponseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {

        request.getSession().invalidate(); // For session-based auth
        return ResponseEntity.ok("Logged out successfully");
    }

}


