package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.UserDTO;
import com.example.journalsystem.Service.UserService;
import com.example.journalsystem.models.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO user) {
        String username = user.getUsername();
        String password = user.getPassword();

        // Authenticate the user using the service
        Optional<User> foundUser = userService.findByUsername(username);

        if (foundUser.isPresent()) {
            User currentUser = foundUser.get();
            if (currentUser.getPassword().equals(password)) {
                System.out.println(currentUser);
                 UserDTO userDTO = currentUser.UserToDTO();
                return ResponseEntity.ok(userDTO);
            }
        }
        // Authentication fails, return a JSON object with an error message
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(null);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO){
        boolean isRegistered = userService.registerUser(userDTO);

        if(isRegistered){
            return ResponseEntity.ok("User registered");
        }
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists or couldn't be registered");
    }

}
