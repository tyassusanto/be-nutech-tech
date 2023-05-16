CREATE TABLE users (
  id VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  profile_pic VARCHAR(1024),
  PRIMARY KEY (id)
);

INSERT INTO users (id, username, name, password) 
VALUES ('e839b9bb-a035-4297-abeb-b790be6fb590', 'admintyas', 'Tyas si Admin', 'asdqwe123');

CREATE TABLE product (
  id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  buy_price INT NOT NULL,
  sell_price INT NOT NULL,
  qty INT NOT NULL,
  img VARCHAR(1024),
  PRIMARY KEY (id)
);

INSERT INTO product (id, product_name, buy_price, sell_price, qty) 
VALUES ('c8adb838-d6e6-4836-9f80-7f785a920634', 'semar mesem', 25000, 70000, 67);

INSERT INTO product (img) 
VALUES ('c8adb838') WHERE id = 'f5f74ecb-4d2b-4409-a1ab-4728a53b44ae';

UPDATE product SET img = 'c8adb838' WHERE id = 'f5f74ecb-4d2b-4409-a1ab-4728a53b44ae';