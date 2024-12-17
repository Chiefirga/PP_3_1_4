package ru.kata.spring.boot_security.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
//		try {
//			UserService userService = context.getBean(UserService.class);
//			RoleService roleService = context.getBean(RoleService.class);
//
//			User user1 = new User("admin", "admin@mail.ru", 43, "admin");
//			User user2 = new User("user", "user@mail.ru", 43, "user");
//
//			Role roleAdmin = new Role("ROLE_ADMIN");
//			Role roleUser = new Role("ROLE_USER");
//
//			Set<Role> rolesAdmUs = new HashSet<>();
//			rolesAdmUs.add(roleAdmin);
//			rolesAdmUs.add(roleUser);
//
//			Set<Role> rolesUs = new HashSet<>();
//			rolesUs.add(roleUser);
//
//			user1.setRoles(rolesAdmUs);
//			user2.setRoles(rolesUs);
//
//			roleService.add(roleAdmin);
//			roleService.add(roleUser);
//
//			userService.save(user1);
//			userService.save(user2);
//
//		} catch (Exception ignored) {
//		}
	}
}
