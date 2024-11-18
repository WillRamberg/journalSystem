package com.example.journalsystem.DTO;

import com.example.journalsystem.models.Condition.Condition;
import com.example.journalsystem.models.Condition.Condition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConditionDTO {

    private int id;
    private String name;
    private String description;
    private LocalDateTime conditionDate;
    private int userId;

    private UserDTO user;

    public Condition DTOtoCondition(){
        Condition condition = new Condition();
        condition.setId(this.id);
        condition.setName(this.name);
        condition.setDescription(this.description);
        condition.setConditionDate(this.conditionDate);
        condition.setUser(this.user.DTOtoUser());
        return condition;
    }
}
