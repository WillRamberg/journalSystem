package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.ConditionDTO;
import com.example.journalsystem.Service.ConditionServices;
import com.example.journalsystem.models.Condition.Condition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConditionController {
    private final ConditionServices conditionServices;
    @Autowired
    private  ConditionController(ConditionServices conditionServices){
        this.conditionServices = conditionServices;
    }
    @GetMapping("getConditionsByUserId/{userId}")
    public ResponseEntity<List<ConditionDTO>> getConditionsByUserId(@PathVariable int userId){
        List<ConditionDTO> conditionDTOList = conditionServices.getAllConditionsById(userId).stream().map(Condition::ConditionToDTO).toList();
        if(conditionDTOList.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(conditionDTOList);
    }
    @PostMapping
    public ResponseEntity<ConditionDTO> saveCondition(@RequestBody ConditionDTO conditionDTO){
        ConditionDTO saveCondition = conditionServices.saveCondition(conditionDTO);
        return  ResponseEntity.ok(saveCondition);
    }
}
