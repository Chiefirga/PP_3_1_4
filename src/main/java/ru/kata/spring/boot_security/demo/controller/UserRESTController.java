package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/profile/user")
public class UserRESTController {
    private final UserService userService;
    @Autowired
    public UserRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public User userInfo(Principal principal) {
        return userService.findByEmail(principal.getName());
    }
}