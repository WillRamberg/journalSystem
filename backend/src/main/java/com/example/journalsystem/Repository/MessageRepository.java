package com.example.journalsystem.Repository;

import com.example.journalsystem.models.Message.Message;
import com.example.journalsystem.models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findByReceiver(User receiver); // Get messages received by a user

    List<Message> findBySender(User sender); // Get messages sent by a user

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :senderid AND m.receiver.id = :receiverid) " +
            "OR (m.sender.id = :receiverid AND m.receiver.id = :senderid) ORDER BY m.sent_date ASC")
    List<Message> findBySenderAndReceiverOrReceiverAndSender(@Param("senderid") int senderid, @Param("receiverid") int receiverid);
}