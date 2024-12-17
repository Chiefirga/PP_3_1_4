package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void save(User user);

    void update(User user);

    Optional<User> findById(Long id);

    User findByEmail(String email);

    List<User> findAll();

    void deleteById(Long id);
}
