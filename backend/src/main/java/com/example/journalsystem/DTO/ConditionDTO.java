package com.example.journalsystem.DTO;

import com.example.journalsystem.models.Condition.Condition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConditionDTO {

    private Long id;
    private String name;
    private String description;
    private LocalDate date;

    private UserDTO user;

    public Condition DTOtoCondition(){
        Condition condition= new Condition();
        condition.setId(this.id);
        condition.setName(this.name);
        condition.setDescription(this.description);
        condition.setDate(this.date);
        return condition;
    }
}
