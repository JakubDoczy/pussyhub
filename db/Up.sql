BEGIN TRANSACTION;

CREATE TYPE role AS ENUM ('admin', 'user');

CREATE TYPE video_state AS ENUM ('Processing', 'Published');

CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  email TEXT NOT NULL,
  passwd_hash TEXT NOT NULL,
  user_role role NOT NULL,
  username TEXT NOT NULL,
  description TEXT,
  picture_url TEXT,
);

CREATE TABLE videos (
  id BIGINT SERIAL PRIMARY KEY,
  creator_id INTEGER NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  views INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  state video_state NOT NULL,
);



COMMIT;
