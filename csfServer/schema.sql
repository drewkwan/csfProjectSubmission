create database arcade;
use arcade;

create table trivia (
    -- primary key
    username varchar(128) not null,
    highscore int not null,
    category varchar(128) not null,

    primary key(username)
);

create table triviaHighScore (
	username varchar(128) not null,
    highscore int not null,
    
    constraint fk_username
    foreign key (username)
    references trivia(username)
);

drop table user;

create table user (
	username varchar(128) not null,
    password varchar(128) not null,
    arcade_highscore int,
    trivia_highscore int,
    trivia_highscore_category varchar(128),

    primary key(username)
);