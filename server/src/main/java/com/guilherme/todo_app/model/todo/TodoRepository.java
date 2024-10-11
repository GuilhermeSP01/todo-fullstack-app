package com.guilherme.todo_app.model.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guilherme.todo_app.model.user.User;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    public List<Todo> findByUser(User user);
}
