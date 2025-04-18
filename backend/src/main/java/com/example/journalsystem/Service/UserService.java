package com.example.journalsystem.Service;

import com.example.journalsystem.DTO.UserDTO;
import com.example.journalsystem.Repository.UserRepository;
import com.example.journalsystem.models.User.Role;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.getUserById(id);
    }

    public List<User> getDoctorsAndStaff(){
        return userRepository.findUsersByRoleIn(List.of("DOCTOR", "STAFF"));
    }

    public boolean registerUser(UserDTO userDTO) {
        Optional<User> userOpt = userRepository.findByUsername(userDTO.getUsername());
        if (userOpt.isPresent())
            return false;
        User user = userDTO.DTOtoUser();
        userRepository.save(user);
        return true;
    }
}
