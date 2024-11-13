package com.example.journalsystem.Repository;
import com.example.journalsystem.models.Encounter.Encounter;
import com.example.journalsystem.models.Patient.Patient;
import com.example.journalsystem.models.Practitioner.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
@Repository
public interface EncouterRepository extends JpaRepository<Encounter, Long> {

    Optional<Encounter> findAllByPatient(Patient patient);

    Optional<Encounter> findAllByPractitioner(Practitioner practitioner);

}
