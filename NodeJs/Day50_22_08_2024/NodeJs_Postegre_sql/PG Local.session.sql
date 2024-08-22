CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL

)

INSERT INTO users (username,email) VALUES 
('johnDoe','johnDoe@example.com'),
('janeDoe','janeDoe@example.com'),
('johnDoe','johnDoe2@example.com');
