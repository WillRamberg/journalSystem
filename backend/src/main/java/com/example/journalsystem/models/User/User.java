package com.example.journalsystem.models.User;

import com.example.journalsystem.models.Patient.Patient;
import com.example.journalsystem.models.Practitioner.Practitioner;
import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role; //PATIENT, DOCTOR, STAFF
}
