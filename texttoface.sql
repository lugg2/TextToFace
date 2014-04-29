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
(6, '/noGender/eye6', 2, 1),
(7, '/noGender/eye7', 3, 2),
(8, '/noGender/eye8', 1, 2);

CREATE TABLE IF NOT EXISTS brow(
  `id` int(30),
  `picname` varchar(30),
  `height` int(30),
  `width` int(30),
  `gender` int(30)
);

--gender 1:man, 3:woman
INSERT INTO brow VALUES 
(1, '/man/brow/brow1', 1,1, 1), 
(2, '/man/brow/brow2', 1,3, 1),
(3, '/man/brow/brow3', 2,1, 1), 
(4, '/man/brow/brow4', 3,2, 1), 
(5, '/man/brow/brow5', 3,1, 1), 
(6, '/woman/brow/brow1', 2, 3, 3), 
(7, '/woman/brow/brow2', 1, 3, 3),
(8, '/woman/brow/brow3', 1, 3, 3),
(9, '/woman/brow/brow4', 2, 2, 3),
(10, '/woman/brow/brow5', 1, 3, 3);


CREATE TABLE IF NOT EXISTS hair (
  `id` int(30),
  `picname` varchar(30),
  `gender` int(30),
  `volumen` int(30),
  `length` int(30)
);
--length 1: kurz; 3: lang

INSERT INTO hair VALUES 
(1, '/man/hair/hair1',  1, 3, 1), 
(2, '/man/hair/hair2',  1, 2, 1), 
(3, '/man/hair/hair3',  1, 3, 1),
(4, '/man/hair/hair4',  1, 1, 1),
(5, '/man/hair/hair5',  1, 1, 3),
(6, '/man/hair/hair6',  1, 2, 2),
(7, '/woman/hair/hair1',  3, 1, 1), 
(8, '/woman/hair/hair2',  3, 2, 1),
(9, '/woman/hair/hair3',  3, 2, 1),
(10, '/woman/hair/hair4',  3, 2, 3),
(11, '/woman/hair/hair5',  3, 2, 3),
(12, '/woman/hair/hair6',  3, 3, 2);

CREATE TABLE IF NOT EXISTS head (
  `id` int(30),
  `picname` varchar(30),
  `width` int(30),
  `form` varchar(30),
  `age` int(30),
  `scar` int(30)
);
-- form 1 oval und 3 kantig
-- age 1 jung und 3 alt
--scar 3:vorhanden, 1:nicht vorhanden

INSERT INTO head VALUES 
(1, '/noGender/head1', 2, 3, 2,1), 
(2, '/noGender/head2', 1, 1, 1,1),
(3, '/noGender/head3', 3, 2, 3,1),
(4, '/noGender/head4', 1, 1, 2,1),
(5, '/noGender/head5', 2, 1, 2,1),
(6, '/noGender/head6', 3, 2, 1,1);

CREATE TABLE IF NOT EXISTS mouth (
  `id` int(30),
  `picname` varchar(30),
  `width` int(11),
  `height` int(11),
  `gender` int(30),
  `beard`int(30)
);
--beard 1: nicht vorhanden; 0:vorhanden

INSERT INTO mouth VALUES 
(1, '/man/mouth/mouth1', 2, 2, 1, 1), 
(2, '/man/mouth/mouth2', 1, 1, 1, 1), 
(3, '/man/mouth/mouth3', 1, 2, 1, 1),
(4, '/man/mouth/mouth4', 2, 1, 1, 1), 
(5, '/man/mouth/mouth5', 3, 3, 1, 0),
(6, '/man/mouth/mouth6', 2, 2, 1, 1),
(7, '/man/mouth/mouth7', 1, 2, 1, 0),
(8, '/man/mouth/mouth8', 1, 1, 1, 0),
(9, '/woman/mouth/mouth1', 1, 3, 3, 1),
(10, '/woman/mouth/mouth2', 2, 2, 3, 1),
(11, '/woman/mouth/mouth3', 2, 3, 3, 1),
(12, '/woman/mouth/mouth4', 3, 1, 3, 1);

CREATE TABLE IF NOT EXISTS nose (
  `id` int(30),
  `picname` varchar(30),
  `width` int(30),
  `height` int(30),
  `form` int(30)
);

--form 1:ungerade, 3:gerade
INSERT INTO nose VALUES 
(1, '/noGender/nose1', 2, 1, 1), 
(2, '/noGender/nose2', 1, 3, 3), 
(3, '/noGender/nose3', 3, 1, 3),
(4, '/noGender/nose4', 2, 2, 1), 
(5, '/noGender/nose5', 2, 2, 3), 
(6, '/noGender/nose6', 1, 3, 3),
(7, '/noGender/nose7', 3, 2, 3),
(8, '/noGender/nose8', 2, 1, 1),
(9, '/noGender/nose9', 1, 3, 3),
(10, '/noGender/nose10', 2, 3, 2);


