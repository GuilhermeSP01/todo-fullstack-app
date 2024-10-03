package com.guilherme.todo_app.security.jwt;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilherme.todo_app.model.users.User;
import com.guilherme.todo_app.model.users.UserRepository;

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

        // Optional<User> user = userRepository.findByEmail(jwtTokenRequest.getEmail());
        // if(user.isEmpty()) {
        //     return ResponseEntity.of(user);
        // }

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

        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        System.out.println(user);

        return null;
    }
    
}
