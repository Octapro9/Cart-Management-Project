package com.project1.cart.management.Services;

import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

    @Value("${encryption.salts.rounds:10}")
    private int saltRounds;
    private String salt;


//    The PostConstruct annotation is used on a method that needs to be executed after dependency injection
//    is done to perform any initialization.
    @PostConstruct
    public void postConstruct(){
        salt = BCrypt.gensalt(saltRounds);
    }

    public String encryptPassword(String password) {
        return BCrypt.hashpw(password, salt);
    }
    public boolean verifyPassword(String password, String hash){
        return BCrypt.checkpw(password, hash);
    }
}
