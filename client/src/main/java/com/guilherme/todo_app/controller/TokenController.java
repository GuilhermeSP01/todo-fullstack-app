package com.guilherme.todo_app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.guilherme.todo_app.model.jwt.JWTTokenRequest;
import com.guilherme.todo_app.model.jwt.JWTTokenResponse;
import com.guilherme.todo_app.model.jwt.TokenService;
import com.guilherme.todo_app.model.user.User;
import com.guilherme.todo_app.model.user.UserRepository;

@RestController
@RequestMapping("/auth")
public class TokenController {
    
    private final TokenService TokenService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    public TokenController(TokenService TokenService, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.TokenService = TokenService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> generateToken(@RequestBody JWTTokenRequest jwtTokenRequest) {

        var authenticationToken =
            new UsernamePasswordAuthenticationToken(
                jwtTokenRequest.getUsername(), 
                jwtTokenRequest.getPassword());

        var authentication =
            authenticationManager.authenticate(authenticationToken);

        var token =
            TokenService.generateToken(authentication);

        return ResponseEntity.ok(new JWTTokenResponse(token));

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            //return new ResponseEntity<>("E-Mail já cadastrado.", HttpStatus.CONFLICT);
        }
        
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        System.out.println(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
