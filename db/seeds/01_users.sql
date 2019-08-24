-- testing table seeds

-- users
INSERT INTO users (poll_id, email) VALUES ('1','Alice');

-- polls
INSERT INTO polls (admin_id, created_date, title) VALUES ('1', '4/26/2019', 'which movie do you want to watch?');

-- options
INSERT INTO options (poll_id, name) VALUES ('1','avengers');
INSERT INTO options (poll_id, name) VALUES ('1','harry potter');
INSERT INTO options (poll_id, name) VALUES ('1','star wars');
INSERT INTO options (poll_id, name) VALUES ('1','lord of the ring');
INSERT INTO options (poll_id, name) VALUES ('1','fast and furious');

-- voters
INSERT INTO voters (name, email) VALUES ('Daniel', 'daniel123@gmail.com');
INSERT INTO voters (name, email) VALUES ('Bob', 'bob2123@gmail.com');
INSERT INTO voters (name, email) VALUES ('Andrew', 'andrew281@gmail.com');
INSERT INTO voters (name, email) VALUES ('Declan', 'declan32491@gmail.com');
INSERT INTO voters (name, email) VALUES ('Annie', 'annie2191@gmail.com');

-- rankings
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('1','1','1','1');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('1','1','2','3');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('1','1','3','2');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('1','1','4','4');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('1','1','5','5');

INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('2','1','1','3');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('2','1','2','2');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('2','1','3','1');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('2','1','4','4');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('2','1','5','5');

INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('3','1','1','4');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('3','1','2','2');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('3','1','3','3');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('3','1','4','5');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('3','1','5','1');

INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('4','1','1','1');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('4','1','2','3');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('4','1','3','2');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('4','1','4','5');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('4','1','5','4');

INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('5','1','1','3');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('5','1','2','1');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('5','1','3','2');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('5','1','4','5');
INSERT INTO rankings (voter_id, poll_id, option_id, rank) VALUES ('5','1','5','4');



