CREATE DATABASE IF NOT EXISTS journalsystem;

USE journalsystem;


-- Användare-tabellen för inloggning och rollhantering
CREATE TABLE Users (
                       user_id INT PRIMARY KEY AUTO_INCREMENT,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL ,
                       role ENUM('patient', 'doctor', 'staff') NOT NULL
);

-- Patient-tabellen för patientinformation
CREATE TABLE Patients (
                          patient_id INT PRIMARY KEY AUTO_INCREMENT,
                          social_security INT NOT NULL,
                          first_name VARCHAR(50) NOT NULL,
                          last_name VARCHAR(50) NOT NULL,
                          gender ENUM('male', 'female', 'other') NOT NULL,
                          contact_info VARCHAR(100),
                          FOREIGN KEY (social_security) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Practitioner-tabellen för personalinformation
CREATE TABLE Practitioners (
                               practitioner_id INT PRIMARY KEY AUTO_INCREMENT,
                               user_id INT NOT NULL,
                               first_name VARCHAR(50) NOT NULL,
                               last_name VARCHAR(50) NOT NULL,
                               specialty VARCHAR(100),
                               FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Organization-tabellen för organisationen där personal jobbar
CREATE TABLE Organizations (
                               organization_id INT PRIMARY KEY AUTO_INCREMENT,
                               name VARCHAR(100) NOT NULL,
                               address VARCHAR(255)
);

-- Location-tabellen för olika platser
CREATE TABLE Locations (
                           location_id INT PRIMARY KEY AUTO_INCREMENT,
                           name VARCHAR(100) NOT NULL,
                           address VARCHAR(255),
                           organization_id INT,
                           FOREIGN KEY (organization_id) REFERENCES Organizations(organization_id) ON DELETE SET NULL
);

-- Condition-tabellen för diagnoser
CREATE TABLE Conditions (
                            condition_id INT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR(100) NOT NULL,
                            description TEXT
);

-- Encounter-tabellen för patientmöten
CREATE TABLE Encounters (
                            encounter_id INT PRIMARY KEY AUTO_INCREMENT,
                            patient_id INT NOT NULL,
                            practitioner_id INT NOT NULL,
                            location_id INT,
                            encounter_date DATE NOT NULL,
                            notes TEXT,
                            FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE,
                            FOREIGN KEY (practitioner_id) REFERENCES Practitioners(practitioner_id) ON DELETE CASCADE,
                            FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE SET NULL
);

-- Observation-tabellen för observationer under ett patientmöte
CREATE TABLE Observations (
                              observation_id INT PRIMARY KEY AUTO_INCREMENT,
                              encounter_id INT NOT NULL,
                              condition_id INT,
                              description TEXT,
                              observation_date DATE NOT NULL,
                              FOREIGN KEY (encounter_id) REFERENCES Encounters(encounter_id) ON DELETE CASCADE,
                              FOREIGN KEY (condition_id) REFERENCES Conditions(condition_id) ON DELETE SET NULL
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
