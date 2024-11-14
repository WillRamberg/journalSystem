package com.example.journalsystem.Controllers;

import com.example.journalsystem.Service.UserService;
import com.example.journalsystem.models.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        boolean isRegistered = userService.registerUser(user);

        if(isRegistered){
            return ResponseEntity.ok("User registered");
        }
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists or couldn't be registered");
    }

}
