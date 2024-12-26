package ru.kata.spring.boot_security.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Optional;
import java.util.Set;

@Component
public class DataLoader {

    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public DataLoader(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {

        Optional<User> adminOptional = Optional.ofNullable(userService.findByEmail("admin@mail.ru"));
        if (adminOptional.isEmpty()) {
            createDefaultUsers();
        }
    }

    private void createDefaultUsers() {
        if (roleService.getRoleByName("ROLE_ADMIN") == null) {
            Role adminRole = new Role("ROLE_ADMIN");
            roleService.add(adminRole);
        }
        if (roleService.getRoleByName("ROLE_USER") == null) {
            Role userRole = new Role("ROLE_USER");
            roleService.add(userRole);
        }

        Role adminRole = roleService.getRoleByName("ROLE_ADMIN");
        Role userRole = roleService.getRoleByName("ROLE_USER");

        User admin = new User("admin", "admin", "admin@mail.ru", 44, "admin");
        admin.setRoles(Set.of(adminRole));
        userService.save(admin);

        User user = new User("user", "user", "user@mail.ru", 44, "user");
        user.setRoles(Set.of(userRole));
        userService.save(user);
    }
}
