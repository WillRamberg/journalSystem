package com.example.journalsystem.DTO;

import com.example.journalsystem.models.Message.Message;
import com.example.journalsystem.models.User.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MessageDTO {

    private int id;
    private int senderId;
    private String senderUsername;
    private int receiverId;
    private String receiverUsername;
    private String message_text;
    private LocalDateTime sentDate;

    public Message toEntity(User sender, User receiver) {
        Message message = new Message();
        message.setId(this.id);
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setMessage_text(this.message_text);
        message.setSent_date(this.sentDate);
        return message;
    }
}
