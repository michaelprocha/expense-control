CREATE DATABASE infomoney;

USE infomoney;

/* tables */
/* user table */
CREATE TABLE usuarios (
	user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    access VARCHAR(255) NOT NULL
);

/* user income */
CREATE TABLE income (
	income_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    usuario_user_id INT NOT NULL,
	spending_target DECIMAL,
    total_saved DECIMAL,
    FOREIGN KEY (usuario_user_id) REFERENCES usuarios(user_id)
);

/* user product */
CREATE TABLE product (
	product_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    usuario_user_id INT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
	product_value DECIMAL NOT NULL,
    product_date DATE NOT NULL,
    FOREIGN KEY (usuario_user_id) REFERENCES usuarios(user_id)
);