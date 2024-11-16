package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.ObservationDTO;
import com.example.journalsystem.Service.ObservationService;
import com.example.journalsystem.models.Observation.Observation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ObservationController {

    private final ObservationService observationService;

    @Autowired
    public ObservationController(ObservationService observationService) {
        this.observationService = observationService;
    }

    @GetMapping("/getObservationsByUserId/{userId}")
    public ResponseEntity<List<ObservationDTO>> getObservationsByUserId(@PathVariable int userId) {
        List<ObservationDTO> observationsList = observationService.getAllObservationsById(userId).stream().map(Observation::ObservationToDTO).toList();



        if(observationsList.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(observationsList);
    }

    @PostMapping("/saveObservation")
    public ResponseEntity<ObservationDTO> saveObservation(@RequestBody ObservationDTO observationDTO){
        ObservationDTO savedObservation = observationService.saveObservation(observationDTO);
        return ResponseEntity.ok(savedObservation);
    }
}


