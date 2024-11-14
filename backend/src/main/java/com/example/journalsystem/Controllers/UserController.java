package com.example.journalsystem.Controllers;

import com.example.journalsystem.Service.UserService;
import com.example.journalsystem.models.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<User>> getUserByEmail(String email){
        List<User> users = userService.getUserByEmail(email);
        if(users.isEmpty())
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(int id){
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        // Authenticate the user using the service
        boolean isAuthenticated = userService.authenticateUser(username, password);

        if (isAuthenticated) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
