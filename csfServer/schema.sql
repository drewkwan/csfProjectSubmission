create database arcade;
use arcade;

create table triviaHighScore (
	username varchar(128) not null,
    highscore int not null,
    categoru varchar(128) not null,
    
    constraint fk_username
    foreign key (username)
    references trivia(username)
);

create table user (
	username varchar(128) not null,
    password varchar(128) not null,
    arcade_highscore int,
    trivia_highscore int,
    trivia_highscore_category varchar(128),

    primary key(username)
);

create table user_role (
    user_id varchar(128) not null,
    role_id varchar(128) not null
);

create table role (
    role_name varchar(128) not null,
    role_description varchar(128) not null
);