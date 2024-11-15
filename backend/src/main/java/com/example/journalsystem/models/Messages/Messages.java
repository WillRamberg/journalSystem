package com.example.journalsystem.models.Messages;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long message_id;
    private Long receiver_id;
    private Long render_id;
    private String message_text;
    private LocalDate sent_date;
}