package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/admin")
    public String admin() {

        return "admin-page";
    }

    @GetMapping("/user")
    public String user(){
        return "current-user";
    }
}
