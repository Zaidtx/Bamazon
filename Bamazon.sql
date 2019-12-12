DROP DATABASE IF EXISTS bamazon_bd;

CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL
, product_name VARCHAR(45) NOT Null
, department_name VARCHAR(45) NOT Null
, price decimal(10,2) NOt null
, stock_quantity Int(10) Not null,
primary key(item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Uncharted 4", "Video Games", 49.95, 150),
  ("DOOM", "Video Games", 59.99, 200),
  ("Crate of Spam", "Food and Drink", 24.50, 50),
  ("Cool Shades", "Apparel", 75.00, 5),
  ("Worn Denim Jeans", "Apparel", 54.25, 35),
  ("Survival Towel", "Necessities", 42.42, 42),
  ("Bill and Ted's Excellent Adventure", "Films", 15.00, 25),
  ("Mad Max: Fury Road", "Films", 25.50, 57),
  ("Monopoly", "Board Games", 30.50, 35),
  ("Yahtzee", "Board Games", 19.95, 23);




