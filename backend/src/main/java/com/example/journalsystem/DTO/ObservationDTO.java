package com.example.journalsystem.DTO;

import com.example.journalsystem.models.Observation.Observation;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObservationDTO {


    private int id;
    private String name;
    private String description;
    private LocalDateTime observationDate;
    private int userId;

    private UserDTO user;
    public Observation DTOtoObservation(){
        Observation observation = new Observation();
        observation.setId(this.id);
        observation.setName(this.name);
        observation.setDescription(this.description);
        observation.setObservationDate(this.observationDate);
        observation.setUser(this.user.DTOtoUser());
        return observation;
    }
}
