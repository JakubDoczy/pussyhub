BEGIN TRANSACTION;

CREATE TYPE role AS ENUM ('admin', 'user');
CREATE TYPE video_state AS ENUM ('processing', 'published');

CREATE TABLE registered_user (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL,
  password TEXT NOT NULL,
  user_role role NOT NULL,
  username TEXT NOT NULL UNIQUE,
  description TEXT,
  picture_url TEXT
);

CREATE TABLE video (
  id BIGSERIAL PRIMARY KEY,
  creator_id BIGINT NOT NULL REFERENCES registered_user(id),
  name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  video_url TEXT NOT NULL UNIQUE,
  views INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  state video_state NOT NULL
);

CREATE TABLE rating (
  video_id BIGINT NOT NULL REFERENCES video(id),
  user_id BIGINT NOT NULL REFERENCES registered_user(id),
  rating NUMERIC NOT NULL CHECK (ABS(rating) = 1),
  UNIQUE (video_id, user_id)
);



COMMIT;

BEGIN TRANSACTION;


INSERT INTO registered_user (email, verified, password, user_role, username, description) VALUES ('admin@pussyhub.com', TRUE, 'admin', 'admin', 'Administrator', 'I am an administrator.');
INSERT INTO registered_user (email, verified, password, user_role, username, description) VALUES ('user@user.com', TRUE, 'user', 'user', 'User', 'I am a user.');
INSERT INTO registered_user (email, verified, password, user_role, username, description) VALUES ('newuser@user.com', FALSE, 'user', 'user', 'Unverified User', 'I am unverified user.');


COMMIT;
