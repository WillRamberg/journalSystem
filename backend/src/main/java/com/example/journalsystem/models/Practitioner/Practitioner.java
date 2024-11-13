package com.example.journalsystem.models.Practitioner;

import com.example.journalsystem.models.Encounter.Encounter;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Practitioner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String lastName;
    private String specialty;
}
