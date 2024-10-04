DROP DATABASE IF EXISTS db_serverless;

CREATE DATABASE db_serverless;

USE db_serverless;

CREATE TABLE t_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE t_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES t_users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO t_users (username, email, password) VALUES
('johndoe', 'johndoe@example.com', 'password123');