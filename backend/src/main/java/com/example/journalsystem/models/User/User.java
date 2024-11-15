package com.example.journalsystem.models.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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

}
