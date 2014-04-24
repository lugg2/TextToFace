--
-- Datenbank: `texttoface`
--

CREATE TABLE IF NOT EXISTS eye (
  `id` int(30),
  `picname` varchar(50),
  `length` int(30),
  `height` int(30)
);

INSERT INTO eye VALUES 
(1, '/noGender/eye1', 1, 3), 
(2, '/noGender/eye2', 2, 3), 
(3, '/noGender/eye3', 1, 1), 
(4, '/noGender/eye4', 3, 2),
(5, '/noGender/eye5', 3, 2), 
(6, '/noGender/eye6', 2, 1);

CREATE TABLE IF NOT EXISTS brow(
  `id` int(30),
  `picname` varchar(30),
  `height` int(30),
  `width` int(30),
  `gender` varchar(30)
);

INSERT INTO brow VALUES 
(1, '/man/brow/brow1', 1,1, 'man'), 
(2, '/man/brow/brow2', 1,3, 'man'),
(3, '/man/brow/brow3', 2,1, 'man'), 
(4, '/man/brow/brow4', 3,2, 'man'), 
(5, '/woman/brow/brow1', 2, 3, 'woman'), 
(6, '/woman/brow/brow2', 1, 3, 'woman');

CREATE TABLE IF NOT EXISTS beard (
  `id` int(30),
  `picname` varchar(30),
  `beard` int(11)
);


CREATE TABLE IF NOT EXISTS hair (
  `id` int(30),
  `picname` varchar(30),
  `baldhead` int(11),
  `gender` varchar(30),
  `volumen` int(30)
);

INSERT INTO hair VALUES 
(1, '/man/hair/hair1', 2, 'man', 3), 
(2, '/man/hair/hair2', 2, 'man', 2), 
(3, '/man/hair/hair3', 2, 'man', 3),
(4, '/woman/hair/hair1', 2, 'woman', 1), 
(5, '/woman/hair/hair2', 2, 'woman', 2);

CREATE TABLE IF NOT EXISTS head (
  `id` int(30),
  `picname` varchar(30),
  `width` int(30),
  `form` varchar(30),
  `age` int(30)
);
-- form 1 oval und 3 kantig
-- age 1 jung und 3 alt

INSERT INTO head VALUES 
(1, '/noGender/head1', 2, 3, 2), 
(2, '/noGender/head2', 1, 1, 1), 
(3, '/noGender/head3', 3, 2, 3), 
(4, '/noGender/head4', 1, 1, 2),
(5, '/noGender/head5', 2, 2, 1);


CREATE TABLE IF NOT EXISTS mouth (
  `id` int(30),
  `picname` varchar(30),
  `width` int(11),
  `height` int(11),
  `gender` varchar(30)
);

INSERT INTO mouth VALUES 
(1, '/man/mouth/mouth1', 2, 2, 'man'), 
(2, '/man/mouth/mouth2', 1, 1, 'man'), 
(3, '/man/mouth/mouth3', 1, 2, 'man'),
(4, '/man/mouth/mouth4', 2, 1, 'man'), 
(5, '/woman/mouth/mouth1', 1, 3, 'woman'), (6, '/woman/mouth/mouth2', 2, 2, 'woman');

CREATE TABLE IF NOT EXISTS nose (
  `id` int(30),
  `picname` varchar(30),
  `width` int(30),
  `height` int(30),
  `form` varchar(30)
);

INSERT INTO nose VALUES 
(1, '/noGender/nose1', 2, 1, 'ungerade'), 
(2, '/noGender/nose2', 1, 3, 'gerade'), 
(3, '/noGender/nose3', 3, 1, 'gerade'),
(4, '/noGender/nose4', 2, 2, 'ungerade'), 
(5, '/noGender/nose5', 2, 2, 'gerade'), (6, '/noGender/nose6', 1, 3, 'gerade');


CREATE TABLE IF NOT EXISTS ear (
  `id` int(30) ,
  `picname` varchar(30),
  `height` int(30),
  `width` int(30),
  `decoration` int(30)
);

INSERT INTO ear VALUES 
(1, '/noGender/ear1', 1, 1,1), 
(2, '/noGender/ear2', 1, 2,1), 
(3, '/noGender/ear3', 2, 2,1), 
(4, '/noGender/ear4', 1, 2,1),
(5, '/noGender/ear5', 2, 2,1), 
(6, '/noGender/ear6', 1, 3,1);
