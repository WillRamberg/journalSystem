package com.example.journalsystem.models.Condition;

import com.example.journalsystem.DTO.ConditionDTO;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "Conditions")
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id") // Definierar foreign key
    private User user;

    public ConditionDTO ConditionToDTO(){
      ConditionDTO conditionDTO= new ConditionDTO();
      conditionDTO.setId(this.id);
      conditionDTO.setName(this.name);
      conditionDTO.setDescription(this.description);
      conditionDTO.setDate(this.date);
      return conditionDTO;
    }
}
