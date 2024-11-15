package com.example.journalsystem.models.Observation;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDate observationDate;
}
