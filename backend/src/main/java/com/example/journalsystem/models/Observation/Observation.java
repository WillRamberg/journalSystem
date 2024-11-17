package com.example.journalsystem.models.Observation;

import com.example.journalsystem.DTO.ObservationDTO;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "observations")
@Data
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private LocalDateTime observationDate;

    @ManyToOne
    @JoinColumn(name = "user_id") // Definierar foreign key
    private User user;

    public ObservationDTO ObservationToDTO(User user) {
        ObservationDTO observationDTO = new ObservationDTO();
        observationDTO.setId(this.id);
        observationDTO.setName(this.name);
        observationDTO.setDescription(this.description);
        observationDTO.setUserId(user.getId());
        observationDTO.setObservationDate(this.observationDate);
        observationDTO.setUser(user.UserToDTO());
        return observationDTO;
    }
}
