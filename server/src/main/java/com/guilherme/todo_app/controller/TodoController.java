package com.guilherme.todo_app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilherme.todo_app.model.todo.Todo;
import com.guilherme.todo_app.model.todo.TodoRepository;
import com.guilherme.todo_app.model.user.User;
import com.guilherme.todo_app.model.user.UserRepository;

@RestController
@RequestMapping("/api/users/{userId}/todos")
public class TodoController {
    
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> retrieveAllTodosFromUser(@PathVariable Long userId) {
        
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        List<Todo> todos = todoRepository.findByUser(user.get());
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<Todo> retrieveTodo(@PathVariable Long userId, @PathVariable Long todoId) {

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Todo> todo = todoRepository.findById(todoId);
        if(!todo.isPresent() || !todo.get().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(todo.get());
    }

    @GetMapping("/completed/{completionStatus}")
    public ResponseEntity<List<Todo>> retrieveAllTodosFromUserByCompletionStatus(@PathVariable Long userId, @PathVariable boolean completionStatus) {
        
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        List<Todo> todos = todoRepository.findByUserAndDone(user.get(), completionStatus);
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@PathVariable Long userId, @RequestBody Todo todo) {

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        todo.setUser(user.get());
        todoRepository.save(todo);

        return ResponseEntity.status(HttpStatus.CREATED).body(todo);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long userId, @PathVariable Long todoId, @RequestBody Todo todoDetails) {

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Todo> todo = todoRepository.findById(todoId);
        if(!todo.isPresent() || !todo.get().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }

        Todo updatedTodo = todo.get();
        updatedTodo.setTitle(todoDetails.getTitle());
        updatedTodo.setDescription(todoDetails.getDescription());
        updatedTodo.setTargetDate(todoDetails.getTargetDate());
        updatedTodo.setDone(todoDetails.isDone());
        
        todoRepository.save(updatedTodo);

        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long userId, @PathVariable Long todoId) {

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Todo> todo = todoRepository.findById(todoId);
        if(!todo.isPresent() || !todo.get().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }

        todoRepository.delete(todo.get());
        return ResponseEntity.ok().build();
    }

}
