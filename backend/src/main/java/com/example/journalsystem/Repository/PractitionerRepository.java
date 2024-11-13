package com.example.journalsystem.Repository;
import com.example.journalsystem.models.Practitioner.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {

    List<Practitioner> findById(int Id);
    Optional<Practitioner> findBySpecialty(String specialty);

    List<Practitioner> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
}
