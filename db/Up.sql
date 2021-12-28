BEGIN TRANSACTION;

CREATE TYPE role AS ENUM ('admin', 'user');
CREATE TYPE video_state AS ENUM ('Processing', 'Published');
--CREATE TYPE rating AS ENUM ('like', 'dislike');


CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL,
  password TEXT NOT NULL,
  user_role role NOT NULL,
  username TEXT NOT NULL UNIQUE,
  description TEXT,
  picture_url TEXT
);

CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  creator_id BIGINT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  video_url TEXT NOT NULL UNIQUE,
  views INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  state video_state NOT NULL
);

CREATE TABLE ratings (
  video_id BIGINT NOT NULL REFERENCES videos(id),
  user_id BIGINT NOT NULL REFERENCES users(id),
  rating NUMERIC NOT NULL CHECK (ABS(rating) = 1),
  UNIQUE (video_id, user_id)
);



COMMIT;

BEGIN TRANSACTION;


INSERT INTO users (email, verified, password, user_role, username, description) VALUES ('admin@pussyhub.com', TRUE, 'admin', 'admin', 'Administrator', 'I am an administrator.');
INSERT INTO users (email, verified, password, user_role, username, description) VALUES ('user@user.com', TRUE, 'user', 'user', 'User', 'I am a user.');
INSERT INTO users (email, verified, password, user_role, username, description) VALUES ('newuser@user.com', FALSE, 'user', 'user', 'Unverified User', 'I am unverified user.');


COMMIT;
