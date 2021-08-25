DROP DATABASE if EXISTS;
CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id integer primary key NOT NULL AUTO_INCREMENT, text varchar(140), user_id integer, room_id integer
);

/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id integer primary key NOT NULL AUTO_INCREMENT, name varchar(30)
);

CREATE TABLE users (
  id integer primary key NOT NULL AUTO_INCREMENT, username varchar(15)
);

CREATE TABLE friends (
  user_id integer primary key NOT NULL, friend_id integer NOT NULL
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

