package com.example.journalsystem.models.Encounter;

import com.example.journalsystem.models.Observation.Observation;
import com.example.journalsystem.models.Patient.Patient;
import com.example.journalsystem.models.Practitioner.Practitioner;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Encounter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "practitioner_id")
    private Practitioner practitioner;

    @OneToMany(mappedBy = "encounter", cascade = CascadeType.ALL)
    private List<Observation> observations = new ArrayList<>();
}
