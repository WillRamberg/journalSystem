package com.example.journalsystem.models.Message;

import com.example.journalsystem.DTO.MessageDTO;
import com.example.journalsystem.models.User.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name ="messages")
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    private String message_text;
    private LocalDateTime sent_date;

    // Method to convert Message entity to MessageDTO
    public MessageDTO MessageToDTO() {
        MessageDTO dto = new MessageDTO();
        dto.setId(this.id);
        dto.setSenderId(this.sender.getId());
        dto.setSenderUsername(this.sender.getUsername());
        dto.setReceiverId(this.receiver.getId());
        dto.setReceiverUsername(this.receiver.getUsername());
        dto.setMessage_text(this.message_text);
        dto.setSentDate(this.sent_date);
        return dto;
    }
}
