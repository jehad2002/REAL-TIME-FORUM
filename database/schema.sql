-- schema.sql
-- Drop tables if they exist
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS PostCategory;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Action;
DROP TABLE IF EXISTS Message;

-- Create the User table
CREATE TABLE User (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(150),
    Username VARCHAR(50),
    Email VARCHAR(100),
    Password VARCHAR(250),
    Age INTEGER,
    Gender VARCHAR(20),
    FirstName VARCHAR(50),
    LastName VARCHAR(50)
);


-- Create the Category table
CREATE TABLE Category (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Libelle VARCHAR(100),
    Icon VARCHAR(10)
);

-- Create the Post table
CREATE TABLE Post (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(250),
    Content TEXT,
    ImagePath VARCHAR(50),
    VideoPath VARCHAR(50),
    Date DATETIME,
    UserId INTEGER,
    FOREIGN KEY (UserId) REFERENCES User(id)
);

-- Create the Post Post_Category
CREATE TABLE PostCategory (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    PostId INTEGER,
    CategoryId INTEGER,
    FOREIGN KEY (PostId) REFERENCES Post(id)
    FOREIGN KEY (CategoryId) REFERENCES Category(id)
);

CREATE TABLE Comment (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Content TEXT,
    Date DATETIME,
    PostId INTEGER,
    ParentID INTEGER,
    UserId INTEGER,
    FOREIGN KEY (PostId) REFERENCES Post(id)
    FOREIGN KEY (UserId) REFERENCES User(id)
);


CREATE TABLE Action (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Status INTEGER,
    UserId INTEGER,
    PostId INTEGER,
    CommentId INTEGER,
    FOREIGN KEY (UserId) REFERENCES User(id)
    FOREIGN KEY (PostId) REFERENCES Post(id)
    FOREIGN KEY (CommentId) REFERENCES Comment(id)
);
CREATE TABLE Message (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Expediteur INTEGER,
    Destinataire INTEGER,
    Contenue TEXT,
    Date DATETIME,
    Lu BOOLEAN DEFAULT 0, -- Ajout du champ "Lu" avec une valeur par défaut de 0 (non lu)
    FOREIGN KEY (Expediteur) REFERENCES User(id),
    FOREIGN KEY (Destinataire) REFERENCES User(id)
);

-- Marquer tous les anciens messages comme lus

-- Exemples d'insertion de 10 messages formant une discussion entre les utilisateurs avec les ID 2 et 3 sans apostrophes et avec des dates antérieures

-- UPDATE Message SET Lu = 1;

-- Ajoutez d'autres exemples d'insertion pour continuer la discussion

/*
  (2, 3, '1', '2023-12-01 08:30:00'),
  (3, 2, '2', '2023-12-01 09:00:00'),
  (2, 3, '3', '2023-12-03 09:30:00'),
  (3, 2, '4', '2023-12-04 10:00:00'),
  (2, 3, '5', '2023-12-05 10:30:00'),
  (3, 2, '6', '2023-12-06 11:00:00'),
  (2, 3, '7', '2023-12-07 11:30:00'),
  (3, 2, '8', '2023-12-08 12:00:00'),
  (2, 3, '9', '2023-12-09 12:30:00'),
  (3, 2, '10', '2023-12-10 13:00:00');
*/