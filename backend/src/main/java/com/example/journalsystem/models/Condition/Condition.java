package com.example.journalsystem.models.Condition;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long condition_id;
    private LocalDate condition_date;
    private String condition_name;
    private String condition_description;
}
