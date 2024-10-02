package com.guilherme.todo_app.security.jwt;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class TokenController {
    
    private final TokenService TokenService;
    private final AuthenticationManager authenticationManager;

    public TokenController(TokenService TokenService, AuthenticationManager authenticationManager) {
        this.TokenService = TokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<JWTTokenResponse> generateToken(@RequestBody JWTTokenRequest jwtTokenRequest) {

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
    
}
