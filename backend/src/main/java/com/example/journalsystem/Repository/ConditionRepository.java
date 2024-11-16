package com.example.journalsystem.Repository;

import com.example.journalsystem.models.Condition.Condition;
import com.example.journalsystem.models.Observation.Observation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConditionRepository extends JpaRepository<Condition,Long> {
    List<Condition> getAllConditionsById(int id);
}
