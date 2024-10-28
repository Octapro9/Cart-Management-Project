//package com.project1.cart.management.Services;
//
//import com.auth0.jwt.algorithms.Algorithm;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class JWTService {
//    @Value("${jwt.algorithm.key}")
//    private String algorithmKey;
//
//    @Value("${jwt.issuer}")
//    private String issuer;
//
//    @Value("${jwt.expiryInSeconds}")
//    private int expiryInSeconds;
//
//    private Algorithm algorithm;
//    @PostConstruct
//    public void postConstruct() {
//        algorithm = Algorithm.HMAC256()
//    }
//
//}
