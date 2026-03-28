CREATE DATABASE IF NOT EXISTS film DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE film;

CREATE TABLE halls (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE films (
    id VARCHAR(36) PRIMARY KEY,
    rating DECIMAL(3,1) NOT NULL,
    director VARCHAR(255) NOT NULL,
    tags JSON NOT NULL,
    image VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE schedules (
    id VARCHAR(36) PRIMARY KEY,
    film_id VARCHAR(36) NOT NULL,
    daytime DATETIME NOT NULL,
    hall INT NOT NULL,
    rows INT NOT NULL,
    seats INT NOT NULL,
    price INT NOT NULL,
    taken JSON NOT NULL,
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY (hall) REFERENCES halls(id)
);

INSERT INTO halls (id, name) VALUES 
(0, 'Зал 1'),
(1, 'Зал 2'), 
(2, 'Зал 3');