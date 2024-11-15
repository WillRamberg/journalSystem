package com.example.journalsystem.models.Condition;

import jakarta.persistence.*;

@Entity
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String diagnosis;
    private String description;
}
