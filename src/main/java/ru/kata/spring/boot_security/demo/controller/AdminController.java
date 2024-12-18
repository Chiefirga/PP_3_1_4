package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String allUsers(Model model) {
        List<User> users = userService.findAll();
        model.addAttribute("users", users);
        return "user-list";
    }

    @GetMapping("/new")
    public String createUserForm(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("roles", roleService.getAllRoles());
        return "user-create";
    }

    @PostMapping
    public String createUser(@ModelAttribute("user") User user,
                             @RequestParam(value = "roles") String[] roles,
                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "user-create";
        }

        user.setRoles(roleService.getSetOfRoles(roles));

        userService.save(user);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String editUserForm(Model model, @PathVariable("id") Long id) {
        model.addAttribute("roles", roleService.getAllRoles());

        User user = userService.findById(id).orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        model.addAttribute("user", user);

        return "edit-user";
    }

    @PatchMapping("/{id}/edit")
    public String update(@ModelAttribute("user") User user,
                         @RequestParam(value = "roles") String[] roles) {
        user.setRoles(roleService.getSetOfRoles(roles));
        userService.update(user);
        return "redirect:/admin";
    }

    @PostMapping("/{id}/delete")
    public String deleteUser( @PathVariable("id") Long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }
}

