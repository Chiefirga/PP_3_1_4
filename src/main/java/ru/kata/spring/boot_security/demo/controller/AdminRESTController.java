package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminRESTController {

    private final UserServiceImpl userService;

    @Autowired
    public AdminRESTController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById (@PathVariable ("id") Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping()
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.update(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

