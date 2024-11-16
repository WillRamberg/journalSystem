package com.example.journalsystem.models.Observation;

import com.example.journalsystem.DTO.ObservationDTO;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Observations")
@Data
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDate observationDate;
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Definierar foreign key
    private User user;

    public ObservationDTO ObservationToDTO() {
        ObservationDTO observationDTO = new ObservationDTO();
        observationDTO.setId(this.id);
        observationDTO.setName(this.name);
        observationDTO.setDescription(this.description);
        observationDTO.setObservationDate(this.observationDate);
        observationDTO.setUserId(this.user.getId());
        return observationDTO;
    }
}
