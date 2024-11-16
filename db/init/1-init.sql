INSERT INTO Users (username, social_security, first_name, last_name, gender, pass, email, phoneNr, user_role)
VALUES 
('johndoe', '123456-7890', 'John', 'Doe', 'Male', 'password123', 'john.doe@example.com', '123456789', 'PATIENT'),
('janedoe', '098765-4321', 'Jane', 'Doe', 'Female', 'password123', 'jane.doe@example.com', '987654321', 'DOCTOR');

-- Lägg till initiala diagnoser
INSERT INTO Conditions (condition_date, condition_name, condition_description, user_id)
VALUES 
('2024-01-01', 'Hypertension', 'High blood pressure detected.', 1),
('2024-01-02', 'Diabetes', 'Type 2 diabetes diagnosis.', 2);

-- Lägg till initiala observationer
INSERT INTO Observations (observation_name, obersvation_description, observation_date, user_id)
VALUES 
('Blood Pressure Check', 'Patient had elevated blood pressure.', '2024-01-01', 1),
('Blood Sugar Level', 'Patient showed high glucose levels.', '2024-01-02', 2);