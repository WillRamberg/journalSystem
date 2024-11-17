package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.ObservationDTO;
import com.example.journalsystem.Service.ObservationService;
import com.example.journalsystem.models.Observation.Observation;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ObservationController {

    private final ObservationService observationService;

    @Autowired
    public ObservationController(ObservationService observationService) {
        this.observationService = observationService;
    }

    @GetMapping("/getObservationsByUserId/{userId}")
    public ResponseEntity<List<ObservationDTO>> getObservationsByUserId(@PathVariable int userId) {
        List<Observation> observationsList = observationService.getAllObservationsById(userId);
        System.out.println(observationsList);
        List<ObservationDTO> observationDTOList = observationsList.stream()
                .map(observation -> {
                    User user = observation.getUser();
                    return observation.ObservationToDTO(user);
                }).toList();

        if(observationsList.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(observationDTOList);
    }

    @PostMapping("/saveObservation")
    public ResponseEntity<ObservationDTO> saveObservation(@RequestBody ObservationDTO observationDTO){
        ObservationDTO savedObservation = observationService.saveObservation(observationDTO);
        return ResponseEntity.ok(savedObservation);
    }
}


