package com.example.journalsystem.Service;

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

    public User createUser(User user){
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public List<User> getUserByEmail(String email){
        return userRepository.getUserByEmail(email);
    }

    public Optional<User> getUserById(int id){
        return userRepository.getUserById(id);
    }

    public boolean registerUser(User user){
        Optional<User> userOpt = userRepository.findByUsername(user.getUsername());
        if(userOpt.isPresent())
            return false;

        userRepository.save(user);
        return true;
    }
}
