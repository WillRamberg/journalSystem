package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.ConditionDTO;
import com.example.journalsystem.Service.ConditionServices;
import com.example.journalsystem.models.Condition.Condition;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConditionController {

    private final ConditionServices conditionServices;

    // Constructor
    public ConditionController(ConditionServices conditionServices) {
        this.conditionServices = conditionServices;
    }

    // Corrected GetMapping with @PathVariable
    @GetMapping("/getConditionsByUserId/{userId}")
    public ResponseEntity<List<ConditionDTO>> getConditionsByUserId(@PathVariable int userId) {
        List<Condition> conditionsList = conditionServices.getAllConditionsById(userId);

        // Check if the list is empty before processing
        if (conditionsList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<ConditionDTO> conditionDTOList = conditionsList.stream()
                .map(condition -> {
                    User user = condition.getUser();
                    return condition.ConditionToDTO(user); // Ensure this method is defined correctly
                })
                .toList();

        return ResponseEntity.ok(conditionDTOList);
    }

    // Save Condition Endpoint
    @PostMapping("/saveCondition")
    public ResponseEntity<ConditionDTO> saveCondition(@RequestBody ConditionDTO conditionDTO) {
        ConditionDTO saveCondition = conditionServices.saveCondition(conditionDTO);
        return ResponseEntity.ok(saveCondition);
    }
}
