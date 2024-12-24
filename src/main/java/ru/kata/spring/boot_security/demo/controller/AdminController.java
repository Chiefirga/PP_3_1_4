package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
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
    public String allUsers(Principal principal, Model model) {
        User user = userService.findByEmail(principal.getName());
        model.addAttribute("user", user);
        model.addAttribute("users", userService.findAll());
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin-page";
    }

    @PostMapping
    public String createNewUser(@ModelAttribute("user") User user,
                                @RequestParam(value = "nameRoles") String[] roles) {
        user.setRoles(roleService.getSetOfRoles(roles));
        userService.save(user);
        return "redirect:/admin/";
    }

    @GetMapping("{id}/edit")
    public String editUserForm(@ModelAttribute("user") User user,
                               ModelMap model,
                               @PathVariable("id") long id,
                               @RequestParam(value = "editRoles") String[] roles) {
        user.setRoles(roleService.getSetOfRoles(roles));
        model.addAttribute("roles", roleService.getAllRoles());
        model.addAttribute("user", userService.findById(id));
        return "admin";
    }
    @PostMapping("/{id}")
    public String update(@ModelAttribute("user") User user,
                         @PathVariable("id") long id,
                         @RequestParam(value = "editRoles") String[] roles) {
        user.setRoles(roleService.getSetOfRoles(roles));
        userService.update(user);
        return "redirect:/admin/";
    }

    @GetMapping("/{id}/remove")
    public String deleteUserById(@PathVariable("id") long id) {
        userService.deleteById(id);
        return "redirect:/admin/";
    }
}

