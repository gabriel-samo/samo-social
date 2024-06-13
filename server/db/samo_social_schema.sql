CREATE SCHEMA samo_social;
USE samo_social;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(200) NOT NULL,
  name VARCHAR(45) NOT NULL,
  coverPic VARCHAR(300) NULL,
  profilePic VARCHAR(300) NULL,
  city VARCHAR(45) NULL,
  website VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);

CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(200) NULL,
  img VARCHAR(200) NULL,
  userId INT NOT NULL,
  createdAt DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX userId_idx (userId ASC) VISIBLE,
  CONSTRAINT userId
    FOREIGN KEY (userId) 
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(200) NOT NULL,
  createdAt DATETIME NULL,
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX commentUserId_idx (userId ASC) VISIBLE,
  INDEX postId_idx (postId ASC) VISIBLE,
  CONSTRAINT commentUserId
    FOREIGN KEY (userId) 
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT postId
    FOREIGN KEY (postId) 
    REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE stories (
  id INT NOT NULL AUTO_INCREMENT,
  img VARCHAR(200) NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX storyUserId_idx (userId ASC) VISIBLE,
  CONSTRAINT storyUserId
    FOREIGN KEY (userId) 
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE relationships(
  id INT NOT NULL AUTO_INCREMENT,
  followerUserId INT NOT NULL,
  followedUserId INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX followerUserId_idx (followerUserId ASC) VISIBLE,
  INDEX followedUserId_idx (followedUserId ASC) VISIBLE,
  CONSTRAINT followerUserId
    FOREIGN KEY (followerUserId) 
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT followedUserId
    FOREIGN KEY (followedUserId) 
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE likes(
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX likeUserId_idx (userId ASC) VISIBLE,
  INDEX likePostId_idx (postId ASC) VISIBLE,
  CONSTRAINT likeUserId
    FOREIGN KEY (userId) 
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT likePostId
    FOREIGN KEY (postId) 
    REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE USER 'samo_social'@'localhost' IDENTIFIED BY 'samo_social';
GRANT ALL PRIVILEGES ON samo_social.* TO 'samo_social'@'localhost';
FLUSH PRIVILEGES;