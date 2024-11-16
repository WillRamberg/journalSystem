package com.example.journalsystem.Controllers;

import com.example.journalsystem.DTO.MessageDTO;
import com.example.journalsystem.models.Message.Message;
import com.example.journalsystem.models.User.User;
import com.example.journalsystem.Service.MessageService;
import com.example.journalsystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;


    // Send a message
    @PostMapping("/sendMessage")
    public Message sendMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.sendMessage(messageDTO);
    }

    @GetMapping("/getMessagesBetweenUsers/{senderId}/{receiverId}")
    public List<MessageDTO> getMessagesBetweenUsers(@PathVariable int senderId, @PathVariable int receiverId){
        return messageService.getMessagesBetweenUsers(senderId, receiverId)
                .stream().map(Message::MessageToDTO).toList();
    }
}