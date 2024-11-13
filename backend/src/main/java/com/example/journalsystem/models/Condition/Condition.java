package com.example.journalsystem.models.Condition;

import com.example.journalsystem.models.Patient.Patient;
import jakarta.persistence.*;

@Entity
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String diagnosis;
    private String description;
}
