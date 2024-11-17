package com.example.journalsystem.Service;

import com.example.journalsystem.DTO.ObservationDTO;
import com.example.journalsystem.DTO.UserDTO;
import com.example.journalsystem.Repository.ObservationRepository;
import com.example.journalsystem.Repository.UserRepository;
import com.example.journalsystem.models.Observation.Observation;
import com.example.journalsystem.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        return observationRepository.getAllObservationsByuser_id(id);

    }
    public ObservationDTO saveObservation(ObservationDTO observationDTO){
        UserDTO userDTO = userRepository.getUserById(observationDTO.getUserId()).get().UserToDTO();
        observationDTO.setUser(userDTO);
        Observation observation = observationDTO.DTOtoObservation();
        observation.setObservationDate(LocalDateTime.now());
        Observation observationSave = observationRepository.save(observation);

        return new ObservationDTO(
                observationSave.getId(),
                observationSave.getName(),
                observationSave.getDescription(),
                observationSave.getObservationDate(),
                observationSave.getUser().getId(),
                observationSave.getUser().UserToDTO());
    }
}
