BEGIN TRANSACTION;

CREATE TYPE ROLE AS ENUM ('Admin', 'User');

CREATE TYPE VIDEO_STATE AS ENUM ('Processing', 'Published');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  hash TEXT NOT NULL,
  role ROLE NOT NULL,
  username TEXT NOT NULL,
  description TEXT,
  picture_url TEXT,
);

CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  views INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  state VIDEO_STATE NOT NULL,
);



COMMIT;
