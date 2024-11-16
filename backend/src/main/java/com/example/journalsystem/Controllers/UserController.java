package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.UserDTO;
import com.example.journalsystem.Service.UserService;
import com.example.journalsystem.models.User.Role;
import com.example.journalsystem.models.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();

        // Authenticate the user using the service
        Optional<User> foundUser = userService.findByUsername(username);

        if (foundUser.isPresent()) {
            User currentUser = foundUser.get();
            if (currentUser.getPassword().equals(password)) {
                UserDTO userDTO1 = currentUser.UserToDTO();
                return ResponseEntity.ok(userDTO1);
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

    @GetMapping("/getAllUsers")
    public List<UserDTO> getAllUsers(){
        List<User> users = userService.getAllUsers();
        return users.stream().map(User::UserToDTO).toList();
    }

    @GetMapping("/getDoctorsAndStaff")
    public List<UserDTO> getDoctorsAndStaff(){
        List<User> users = userService.getDoctorsAndStaff();
        return users.stream().map(User::UserToDTO).toList();
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id) {
        Optional<User> user = userService.getUserById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().UserToDTO()); // Assuming you have UserToDTO method
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

}
