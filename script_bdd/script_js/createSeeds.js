const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');

// get the client
const mysql = require("mysql2");

// create the connection, specify bluebird as Promise
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bike_renting"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
})

// purger les tables pour éviter les doublons

const table_purger = ['bike_brands', 'bike_orders', 'bike_sizes', 'bike_types', 'bikes', 'users'];
table_purger.forEach((table) => {
  const sql_purge = `DELETE FROM ${table}`;
  con.query(sql_purge, function (err, result) {
    if (err) throw err;
    console.log(`La table ${table} a bien été supprimée`);
  });
});

// créer les seeds

const types = ['VTT', 'VTC', 'BMX', 'Velo de route'];
types.forEach((type, index) => {
  const sql_type = `INSERT INTO bike_types (id_bike_type, type_value) VALUES (${index+1}, '${type}')`;
  con.query(sql_type, function (err, result) {
    if (err) throw err;
    console.log(`Le type de vélo ${type} a bien été ajoutée`);
  });
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
sizes.forEach((size, index) => {
  const sql_size = `INSERT INTO bike_sizes (id_bike_size, size_value) VALUES (${index+1}, '${size}')`;
  con.query(sql_size, function (err, result) {
    if (err) throw err;
    console.log(`La taille de vélo ${size} a bien été ajoutée`);
  });
});

const brands = ['BTWIN', 'MONGOOSE', 'RIVERSIDE', 'ROCKRIDE'];
brands.forEach((brand, index) => {
  const sql_brand = `INSERT INTO bike_brands (id_bike_brand, brand_value) VALUES (${index+1}, '${brand}')`;
  con.query(sql_brand, function (err, result) {
    if (err) throw err;
    console.log(`La marque de vélo ${brand} a bien été ajoutée`);
  });
});

for (let i = 1; i <= 60; i++) {
  const idBikeType = Math.floor(Math.random() * types.length);
  // console.log(idBikeType+1, types[idBikeType]);
  const idBikeSize = Math.floor(Math.random() * sizes.length);
  // console.log(idBikeSize+1,sizes[idBikeSize]);
  const idBikeBrand = Math.floor(Math.random() * brands.length);
  // console.log(idBikeBrand+1, brands[idBikeBrand]);
  const sql_bike = `INSERT INTO bikes (id_bike, id_type, id_size, id_brand) VALUES (${i}, ${idBikeType+1}, ${idBikeSize+1}, ${idBikeBrand+1})`;
  con.query(sql_bike, function (err, result) {
    if (err) throw err;
    console.log(`Le vélo ${i} a bien été ajoutée`);
  });
}

for (let i = 0; i < 5; i++) {
  const lastname = faker.name.lastName();
  const firstname = faker.name.firstName();
  const birthdate = faker.date.birthdate();
  const address = faker.address.streetAddress();
  const email = faker.internet.email();
  const password_user = "password";
  const sql_user = `INSERT INTO users (id_user, lastname, firstname, birthdate, address, email, password_user) VALUES (${i+1}, '${lastname}', '${firstname}', '${birthdate}', '${address}', '${email}', '${password_user}')`;
  con.query(sql_user, function (err, result) {
    if (err) throw err;
    console.log(`L'utilisateur ${firstname} ${lastname.toUpperCase()} a bien été ajoutée`);
  });
  
  for (let j = 1; j <= 5; j++) {
    const schedule_start = dayjs (faker.date.future());
    const schedule_end = schedule_start.add(14, 'day');
    // console.log(schedule_start.format('YYYY-MM-DD'), schedule_end.format('YYYY-MM-DD'));
    const delivery = faker.datatype.boolean();
    const insurance = faker.datatype.boolean();
    const id_bike = Math.floor(Math.random() * 60)+1; // +1 pour éviter l'indice 0 
    const sql_order = `INSERT INTO bike_orders (id_bike_order, schedule_start, schedule_end, delivery, insurance, id_user, id_bike) VALUES (${5*i+j}, '${schedule_start.format('YYYY-MM-DD')}', '${schedule_end.format('YYYY-MM-DD')}', ${delivery}, ${insurance}, ${i+1}, ${id_bike})`;
    con.query(sql_order, function (err, result) {
      if (err) throw err;
      console.log(`La commande ${5*i+j} pour l'utilisateur ${firstname} ${lastname.toUpperCase()} a bien été ajoutée`);
    });
  }
}

