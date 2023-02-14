// get the client
const mysql = require("mysql2");

// create the connection, specify bluebird as Promise
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// supprimer la bdd si elle existe déjà

const sql_drop = "DROP DATABASE IF EXISTS bike_renting;";
con.query(sql_drop, function (err, result) {
  if (err) throw err;
  console.log("La database bike_renting a été supprimée");
});
// créer la bdd

const sql = "CREATE DATABASE IF NOT EXISTS bike_renting;";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("La base de données bike_renting a été créée");
});

const sql_dbb = "use bike_renting";
con.query(sql_dbb, function (err, result) {
  if (err) throw err;
  console.log("bike_renting a été sélectionnée");
});

const sql_types = `
  CREATE TABLE IF NOT EXISTS types (
    id_type INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type_value VARCHAR(255) NOT NULL
  )`;
con.query(sql_types, function (err, result) {
  if (err) throw err;
  console.log("La table types a été créée");
});

const sql_sizes = `
  CREATE TABLE IF NOT EXISTS sizes (
    id_size INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    size_value VARCHAR(255) NOT NULL
  )`;
con.query(sql_sizes, function (err, result) {
  if (err) throw err;
  console.log("La table sizes a été créée");
});

const sql_brands = `
  CREATE TABLE IF NOT EXISTS brands (
    id_brand INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    brand_value VARCHAR(255) NOT NULL
  )`;
con.query(sql_brands, function (err, result) {
  if (err) throw err;
  console.log("La table brands a été créée");
});

const sql_bikes = `
  CREATE TABLE IF NOT EXISTS bikes (
    id_bike INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_type INT (6) NOT NULL,
    id_size INT (6) NOT NULL,
    id_brand INT (6) NOT NULL,
    FOREIGN KEY (id_type) REFERENCES types (id_type),
    FOREIGN KEY (id_size) REFERENCES sizes (id_size),
    FOREIGN KEY (id_brand) REFERENCES brands (id_brand)
  )`;
con.query(sql_bikes, function (err, result) {
  if (err) throw err;
  console.log("La table bikes a été créée");
});

const sql_users = `
  CREATE TABLE IF NOT EXISTS users (
    id_user INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false NOT NULL
  )`;
con.query(sql_users, function (err, result) {
  if (err) throw err;
  console.log("La table users a été créée");
});

const sql_orders = `
  CREATE TABLE IF NOT EXISTS orders (
    id_order INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    schedule_start DATETIME NOT NULL,
    schedule_end DATETIME NOT NULL,
    delivery BOOLEAN NOT NULL,
    insurance BOOLEAN NOT NULL,
    price FLOAT NOT NULL,
    is_paid BOOLEAN DEFAULT false NOT NULL,
    id_user INT (6) NOT NULL,
    id_bike INT (6) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_bike) REFERENCES bikes (id_bike)
  )`;
con.query(sql_orders, function (err, result) {
  if (err) throw err;
  console.log("La table orders a été créée");
});