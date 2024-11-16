CREATE DATABASE IF NOT EXISTS journalsystem;

USE journalsystem;


-- Användare-tabellen för inloggning och rollhantering
CREATE TABLE Users (
                        user_id INT PRIMARY KEY AUTO_INCREMENT,
                        username VARCHAR(50) UNIQUE NOT NULL,
                        social_security VARCHAR(50) NOT NULL,
                        first_name VARCHAR(50) NOT NULL,
                        last_name VARCHAR(50) NOT NULL,
                        gender VARCHAR(50) NOT NULL,
                        pass VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL ,
                        phoneNr VARCHAR(100),
                        user_role VARCHAR(50) DEFAULT ("PATIENT"),
);

-- Condition-tabellen för diagnoser
CREATE TABLE Conditions (
                            condition_id INT PRIMARY KEY AUTO_INCREMENT,
                            condition_date DATE NOT NULL,
                            condition_name VARCHAR(100) NOT NULL,
                            condition_description TEXT,
                            FOREIGN KEY (user_id) ON DELETE CASCADE
);

-- Observation-tabellen för observationer under ett patientmöte
CREATE TABLE Observations (
                              observation_id INT PRIMARY KEY AUTO_INCREMENT,
                              observation_name VARCHAR(100) NOT NULL,
                              obersvation_description TEXT,
                              observation_date DATE NOT NULL,
                                FOREIGN KEY (user_id) ON DELETE CASCADE,
);

-- Message-tabellen för meddelanden mellan användare
CREATE TABLE Messages (
                          message_id INT PRIMARY KEY AUTO_INCREMENT,
                          sender_id INT NOT NULL,
                          receiver_id INT NOT NULL,
                          message_text TEXT NOT NULL,
                          sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                          FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
