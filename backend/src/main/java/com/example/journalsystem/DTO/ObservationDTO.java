package com.example.journalsystem.DTO;

import com.example.journalsystem.models.Observation.Observation;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObservationDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDate observationDate;
    private Long userId;

    public Observation DTOtoObservation(){
        Observation observation = new Observation();
        observation.setId(this.id);
        observation.setName(this.name);
        observation.setDescription(this.description);
        observation.setObservationDate(this.observationDate);
        observation.setUserId(this.userId);
        return observation;
    }
}
