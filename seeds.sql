DROP DATABASE IF EXISTS oversupply;

CREATE DATABASE oversupply;

USE oversupply;

DROP TABLE IF EXISTS products; 

CREATE TABLE products (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

SELECT * FROM products;
