package com.example.journalsystem.Repository;

import com.example.journalsystem.models.Observation.Observation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ObservationRepository extends JpaRepository<Observation, Long> {

    List<Observation> getAllObservationsById(Long id);

}
