create table learner (
    id serial primary key,
    name varchar,
    email varchar not null unique
);