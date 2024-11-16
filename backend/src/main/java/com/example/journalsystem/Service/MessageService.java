package com.example.journalsystem.Service;

import com.example.journalsystem.DTO.MessageDTO;
import com.example.journalsystem.models.Message.Message;
import com.example.journalsystem.models.User.User;
import com.example.journalsystem.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserService userService;

    public List<Message> getMessagesBetweenUsers(int senderId, int receiverId){
        Optional<User> senderOPT = userService.getUserById(senderId);
        Optional<User> receiverOPT = userService.getUserById(receiverId);

        if(senderOPT.isPresent() && receiverOPT.isPresent()){
            User sender = senderOPT.get();
            User receiver = receiverOPT.get();
            List<Message> messages = messageRepository.findBySenderAndReceiverOrReceiverAndSender(sender.getId(), receiver.getId());
            System.out.println(messages);
            return messages;
        }
        return null;
    }

    public Message sendMessage(MessageDTO messageDTO) {
        User sender = userService.getUserById(messageDTO.getSenderId()).get();
        User receiver = userService.getUserById(messageDTO.getReceiverId()).get();

        Message message = messageDTO.toEntity(sender, receiver);
        message.setSent_date(LocalDate.now());
        return messageRepository.save(message);
    }
}