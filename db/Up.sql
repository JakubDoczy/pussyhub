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
  picture_url TEXT,
  created_at TIMESTAMPTZ NOT NULL
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
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

-- password = admin123
INSERT INTO registered_user (email, verified, password, user_role, username, description, created_at) VALUES ('admin@pussyhub.com', TRUE, '$argon2i$v=19$m=4096,t=3,p=1$FQQfYhOUDWNcZxKc1g5k1XWgAEeX2xmSkgi5MImGrE4$BHBbwDBc3GLU4PhM1MK759ituIBNZBwnXSogj2CkR0k', 'admin', 'Administrator', 'I am an administrator.', '2016-06-22 19:10:25-07');
-- password = user123
INSERT INTO registered_user (email, verified, password, user_role, username, description, created_at) VALUES ('user@user.com', TRUE, '$argon2i$v=19$m=4096,t=3,p=1$HpE3b/6hQlBVy02d+T6Ag4D8mwlGrZOEeDAHI7/pBy8$J6es0+aKVN7cVZ9RDlE4E3WBMoAkzJnwzKEs0oRhZ1c', 'user', 'User', 'I am a user.', '2016-06-22 19:10:25-07');


COMMIT;
