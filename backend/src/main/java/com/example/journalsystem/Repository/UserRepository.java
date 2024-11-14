package com.example.journalsystem.Repository;
import com.example.journalsystem.models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> getUserByEmail(String email);

    Optional<User> getUserById(int id);

}
