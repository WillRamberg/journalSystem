package com.example.journalsystem.models.Condition;

import com.example.journalsystem.DTO.ConditionDTO;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "conditions")
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private LocalDateTime conditionDate;

    @ManyToOne
    @JoinColumn(name = "user_id") // Definierar foreign key
    private User user;

    public ConditionDTO ConditionToDTO(User user){
      ConditionDTO conditionDTO= new ConditionDTO();
      conditionDTO.setId(this.id);
      conditionDTO.setName(this.name);
      conditionDTO.setDescription(this.description);
      conditionDTO.setUserId(user.getId());
      conditionDTO.setConditionDate(this.conditionDate);
      conditionDTO.setUser(user.UserToDTO());
      return conditionDTO;
    }
}
