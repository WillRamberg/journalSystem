package com.example.journalsystem.Service;

import com.example.journalsystem.DTO.ConditionDTO;
import com.example.journalsystem.Repository.ConditionRepository;
import com.example.journalsystem.Repository.UserRepository;
import com.example.journalsystem.models.Condition.Condition;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return conditionRepository.getAllConditionsById(id);
    }
    public ConditionDTO saveCondition(ConditionDTO conditionDTO){

        User user = userRepository.getUserById(conditionDTO.getUser().getId()).orElseThrow(()-> new RuntimeException("User not found saveCondition"));

        Condition condition = new Condition();
        condition.setName(conditionDTO.getName());
        condition.setDescription(conditionDTO.getDescription());
        condition.setDate(conditionDTO.getDate());
        condition.setUser(user);

        Condition conditionSave = conditionRepository.save(condition);
        return new ConditionDTO(conditionSave.getId(),
                conditionSave.getName(),
                conditionSave.getDescription(),
                conditionSave.getDate(),
                conditionSave.getUser().UserToDTO());
    }
}
