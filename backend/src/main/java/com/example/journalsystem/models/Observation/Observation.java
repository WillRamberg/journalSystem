package com.example.journalsystem.models.Observation;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long observation_id;
    private String observation_description;
    private LocalDate observation_date;
}
