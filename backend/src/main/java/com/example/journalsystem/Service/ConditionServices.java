package com.example.journalsystem.Service;

import com.example.journalsystem.DTO.ConditionDTO;
import com.example.journalsystem.DTO.UserDTO;
import com.example.journalsystem.Repository.ConditionRepository;
import com.example.journalsystem.Repository.UserRepository;
import com.example.journalsystem.models.Condition.Condition;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class ConditionServices {
    private final ConditionRepository conditionRepository;
    private final UserRepository userRepository;
    @Autowired
    public ConditionServices(ConditionRepository conditionRepository, UserRepository userRepository){
        this.conditionRepository = conditionRepository;
        this.userRepository = userRepository;
    }
    public List<Condition> getAllConditionsById(int id){
        return conditionRepository.getAllConditionsByuser_id(id);
    }
    public ConditionDTO saveCondition(ConditionDTO conditionDTO){
        UserDTO userDTO = userRepository.getUserById(conditionDTO.getUserId()).get().UserToDTO();
        conditionDTO.setUser(userDTO);
        Condition condition = conditionDTO.DTOtoCondition();
        condition.setDate(LocalDateTime.now());
        condition = conditionRepository.save(condition);

        return new ConditionDTO(
                condition.getId(),
                condition.getName(),
                condition.getDescription(),
                condition.getDate(),
                condition.getUser().getId(),
                condition.getUser().UserToDTO());
    }
}
