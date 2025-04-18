package com.example.journalsystem.models.User;

import com.example.journalsystem.DTO.UserDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name ="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String social_security;
    private String first_name;
    private String last_name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String password;
    private String email;
    private String phoneNr;
    @Enumerated(EnumType.STRING)
    private Role role; //PATIENT, DOCTOR, STAFF

    public UserDTO UserToDTO(){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(this.id);
        userDTO.setUsername(this.username);
        userDTO.setSocial_security(this.social_security);
        userDTO.setFirst_name(this.first_name);
        userDTO.setLast_name(this.last_name);
        userDTO.setGender(this.gender);
        userDTO.setPassword(null);
        userDTO.setEmail(this.email);
        userDTO.setPhoneNr(this.phoneNr);
        userDTO.setRole(this.role);

        return userDTO;
    }

}
