package com.example.journalsystem.Service;

import com.example.journalsystem.DTO.ObservationDTO;
import com.example.journalsystem.Repository.ObservationRepository;
import com.example.journalsystem.Repository.UserRepository;
import com.example.journalsystem.models.Observation.Observation;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObservationService {

    private final ObservationRepository observationRepository;
    private final UserRepository userRepository;

    @Autowired
    public ObservationService(ObservationRepository observationRepository,UserRepository userRepository){
        this.userRepository = userRepository;
        this.observationRepository = observationRepository;
    }
    public List<Observation> getAllObservationsById(int id){
        return observationRepository.getAllObservationsById(id);

    }
    public ObservationDTO saveObservation(ObservationDTO observationDTO){
        User user = userRepository.getUserById(observationDTO.getUserId()).orElseThrow(()-> new RuntimeException("User not found saveObservation"));

        Observation observation = new Observation();
        observation.setName(observationDTO.getName());
        observation.setDescription(observationDTO.getDescription());
        observation.setObservationDate(observationDTO.getObservationDate());
        observation.setUser(user);

        Observation observationSave = observationRepository.save(observation);

        return new ObservationDTO(
                observationSave.getId(),
                observationSave.getName(),
                observationSave.getDescription(),
                observationSave.getObservationDate(),
                observationSave.getUser().getId());
    }
}
