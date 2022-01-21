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

CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE video (
  id BIGSERIAL PRIMARY KEY,
  creator_id BIGINT NOT NULL REFERENCES registered_user(id),
  category_id BIGINT NOT NULL REFERENCES category(id),
  name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  video_url TEXT NOT NULL UNIQUE,
  views INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  state video_state DEFAULT 'processing' NOT NULL
);

CREATE TABLE rating (
  video_id BIGINT NOT NULL REFERENCES video(id),
  user_id BIGINT NOT NULL REFERENCES registered_user(id),
  rating SMALLINT NOT NULL CHECK (ABS(rating) = 1),
  UNIQUE (video_id, user_id)
);



COMMIT;

BEGIN TRANSACTION;

-- password = admin123
INSERT INTO registered_user (email, verified, password, user_role, username, description, created_at) VALUES ('admin@pussyhub.com', TRUE, '$argon2i$v=19$m=4096,t=3,p=1$PRr8jWxBenmhVZ2w1KSjoiRaN3JMRj3CjonwKI3T5jw$AnNSZ48O3+w9RuS41EIGTidZrdQFEFr/C/zHfPgEOo4', 'admin', 'Administrator', 'I am an administrator.', '2016-06-22 19:10:25-07');
-- password = user123
INSERT INTO registered_user (email, verified, password, user_role, username, description, created_at) VALUES ('user@user.com', TRUE, '$argon2i$v=19$m=4096,t=3,p=1$krsZeYvPrcJgDboRpswLiNj3KP/B4jhhnqbOMjYNELI$E8x3ptBqo40XzarRkjJkqdZ9Cqgpd7M8Grx7SLq9ve0', 'user', 'User', 'I am a user.', '2016-06-22 19:10:25-07');

INSERT INTO category (name) VALUES ('Testing stuff');
INSERT INTO category (name) VALUES ('Pussy');
INSERT INTO video (creator_id, category_id, name, preview_url, video_url, views, likes, dislikes, created_at, state) VALUES (1, 1, 'My first video', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Big.Buck.Bunny.-.Opening.Screen.png/1200px-Big.Buck.Bunny.-.Opening.Screen.png', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 0, 0, 0, '2021-06-22 19:10:25-07', 'published');
INSERT INTO video (creator_id, category_id, name, preview_url, video_url, views, likes, dislikes, created_at, state) VALUES (2, 1, 'Parkour', 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Team_JiYo_-_pioneerne_indenfor_parkour_i_danmark.jpg', 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8', 0, 0, 0, '2022-01-02 17:10:25-07', 'published');
INSERT INTO video (creator_id, category_id, name, preview_url, video_url, views, likes, dislikes, created_at, state) VALUES (2, 1, 'Sintel', 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Durian_-_Sintel-wallpaper-sintel.jpg', 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8', 0, 0, 0, '2021-05-22 19:10:25-07', 'published');
INSERT INTO video (creator_id, category_id, name, preview_url, video_url, views, likes, dislikes, created_at, state) VALUES (2, 1, 'Asia sneak peak', 'https://cdn.pixabay.com/photo/2019/04/02/08/35/asia-4097149_1280.jpg', 'https://multiplatform-f.akamaihd.net/i/multi/april11/cctv/cctv_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8', 0, 0, 0, '2021-05-22 19:10:25-07', 'published');
INSERT INTO video (creator_id, category_id, name, preview_url, video_url, views, likes, dislikes, created_at, state) VALUES (1, 1, 'BBC World', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/24701-nature-natural-beauty.jpg', 'https://multiplatform-f.akamaihd.net/i/multi/april11/hdworld/hdworld_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8', 0, 0, 0, '2021-05-22 19:10:25-07', 'published');


COMMIT;
