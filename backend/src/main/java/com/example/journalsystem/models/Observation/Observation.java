package com.example.journalsystem.models.Observation;

import com.example.journalsystem.models.Encounter.Encounter;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDate observationDate;

    @ManyToOne
    @JoinColumn(name = "encounter_id")
    private Encounter encounter;
}
