package com.example.journalsystem.models.Observation;

import com.example.journalsystem.DTO.ObservationDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name ="Observations")
@Data
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDate observationDate;

    public ObservationDTO ObservationToDTO(){
        ObservationDTO observationDTO = new ObservationDTO();

        return observationDTO;
    }
}
