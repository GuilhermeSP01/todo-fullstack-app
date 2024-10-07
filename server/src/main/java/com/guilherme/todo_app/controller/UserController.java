package com.guilherme.todo_app.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilherme.todo_app.model.user.User;
import com.guilherme.todo_app.model.user.UserDTO;
import com.guilherme.todo_app.model.user.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @RequestMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        UserDTO userDTO = new UserDTO(user.get().getName(), user.get().getEmail());
        return user.isPresent() ? ResponseEntity.ok(userDTO) : ResponseEntity.notFound().build();
    }

}
