package com.example.journalsystem.Repository;
import com.example.journalsystem.models.Patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findPatientById(int Id);
    Optional<Patient> findBySocialSecurity(String SocialSecurity);

    List<Patient> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
}