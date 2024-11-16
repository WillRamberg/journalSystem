package com.example.journalsystem.DTO;

import com.example.journalsystem.models.User.Gender;
import com.example.journalsystem.models.User.Role;
import com.example.journalsystem.models.User.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private int id;
    private String username;
    private String social_security;
    private String first_name;
    private String last_name;
    private Gender gender;
    private String password;
    private String email;
    private String phoneNr;
    private Role role; //PATIENT, DOCTOR, STAFF

    public User DTOtoUser(){
        User user = new User();
        user.setId(this.id);
        user.setUsername(this.username);
        user.setSocial_security(this.social_security);
        user.setFirst_name(this.first_name);
        user.setLast_name(this.last_name);
        user.setGender(this.gender);
        user.setPassword(this.password);
        user.setEmail(this.email);
        user.setPhoneNr(this.phoneNr);
        user.setRole(this.role);
        return user;
    }
}
