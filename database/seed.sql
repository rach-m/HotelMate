-- \c hotelmate_db
DELETE FROM guests;

INSERT INTO guests
(fname, lname, email, address, city, state, zip, phone, credit_card, check_in, check_out)
VALUES
(
'Nannie',
'Grady',
'nanniegrady@gmail.com',
'4096 Bert Haven',
'East Lea',
'ID',
91745,
'357-613-6525',
7530972164832175,
TO_DATE('06-28-2018', 'MM DD YY'),
TO_DATE('07-05-2018', 'MM DD YY')
);

INSERT INTO guests
  (fname, lname, email, address, city, state, zip, phone, credit_card, check_in, check_out)
VALUES
  (
'Estevan',
'Wintheiser',
'ewin@gmail.com',
'2975 Braun Corners',
'Port Mozelleville',
'CT',
19407,
'309-636-6638',
6857493029875322,
TO_DATE
('08-13-2018', 'MM DD YY'),
TO_DATE
('08-15-2018', 'MM DD YY')
);


INSERT INTO guests
  (fname, lname, email, address, city, state, zip, phone, credit_card, check_in, check_out)
VALUES
  (
'Wade',
'Bayer',
'wadebayer@gmail.com',
'7942 Metz Point',
 'Medhurstbury',
 'NM',
 89291,
'458-298-8888',
7891726450982470,
TO_DATE
('10-23-2018', 'MM DD YY'),
TO_DATE
('10-29-2018', 'MM DD YY')
);

INSERT INTO reservations
  (room_number, late_checkout, guest_id)
VALUES
  (
    235,
    'Y',
    '1'
);
INSERT INTO reservations
  (room_number, late_checkout, guest_id)
VALUES
  (
    345,
    'Y',
    '2'
);
INSERT INTO reservations
  (room_number, late_checkout, guest_id)
VALUES
  (
    185,
    'N',
    '3'
);
