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

const table_purger = ['brands', 'orders', 'sizes', 'types', 'bikes', 'users'];
table_purger.forEach((table) => {
  const sql_purge = `
    DELETE FROM ${table}
  `;
  con.query(sql_purge, function (err, result) {
    if (err) throw err;
    console.log(`La table ${table} a bien été supprimée`);
  });
});

// créer les seeds

const types = ['VTT', 'VTC', 'BMX', 'Velo de route'];
types.forEach((type, index) => {
  const sql_type = `
    INSERT INTO types (id_type, type_value) 
    VALUES (${index+1}, '${type}')
  `;
  con.query(sql_type, function (err, result) {
    if (err) throw err;
    console.log(`Le type de vélo ${type} a bien été ajoutée`);
  });
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
sizes.forEach((size, index) => {
  const sql_size = `
    INSERT INTO sizes (id_size, size_value) 
    VALUES (${index+1}, '${size}')
  `;
  con.query(sql_size, function (err, result) {
    if (err) throw err;
    console.log(`La taille de vélo ${size} a bien été ajoutée`);
  });
});

const brands = ['BTWIN', 'MONGOOSE', 'RIVERSIDE', 'ROCKRIDER'];
brands.forEach((brand, index) => {
  const sql_brand = `
    INSERT INTO brands (id_brand, brand_value) 
    VALUES (${index+1}, '${brand}')
  `;
  con.query(sql_brand, function (err, result) {
    if (err) throw err;
    console.log(`La marque de vélo ${brand} a bien été ajoutée`);
  });
});

for (let i = 1; i <= 60; i++) {
  const idType = Math.floor(Math.random() * types.length);
  // console.log(idBikeType+1, types[idBikeType]);
  const idSize = Math.floor(Math.random() * sizes.length);
  // console.log(idBikeSize+1,sizes[idBikeSize]);
  const idBrand = Math.floor(Math.random() * brands.length);
  // console.log(idBikeBrand+1, brands[idBikeBrand]);
  const sql_bike = `
    INSERT INTO bikes (id_bike, id_type, id_size, id_brand) 
    VALUES (${i}, ${idType+1}, ${idSize+1}, ${idBrand+1})
  `;
  con.query(sql_bike, function (err, result) {
    if (err) throw err;
    console.log(`Le vélo ${i} a bien été ajoutée`);
  });
}

for (let i = 0; i < 5; i++) {
  const lastname = faker.name.lastName().replaceAll("'", "''"); // pour éviter d'insérer des ' car erreur SQL
  const firstname = faker.name.firstName().replaceAll("'", "''");
  const birthdate = dayjs (faker.date.birthdate({min: 18, max: 65, mode: 'age'}));
  const address = faker.address.streetAddress().replaceAll("'", "''");
  const email = faker.internet.email();
  const password_user = "password";
  const sql_user = `
    INSERT INTO users (id_user, lastname, firstname, birthdate, address, email, password_user) 
    VALUES (${i+1}, '${lastname}', '${firstname}', '${birthdate.format('YYYY-MM-DD')}', '${address}', '${email}', '${password_user}')
  `;
  con.query(sql_user, function (err, result) {
    if (err) throw err;
    console.log(`L'utilisateur ${firstname} ${lastname.toUpperCase()} a bien été ajoutée`);
  });
  
  for (let j = 1; j <= 5; j++) {
    const schedule_start = dayjs (faker.date.future()); //librairie pour faciliter la gestion de la date
    const schedule_end = schedule_start.add(14, 'day');
    // console.log(schedule_start.format('YYYY-MM-DD'), schedule_end.format('YYYY-MM-DD'));
    const delivery = faker.datatype.boolean();
    const insurance = faker.datatype.boolean();
    const price = 140;
    const is_paid = faker.datatype.boolean();
    const id_bike = Math.floor(Math.random() * 60)+1; // +1 pour éviter l'indice 0 
    const sql_order = `
      INSERT INTO orders (id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, id_user, id_bike) 
      VALUES (${5*i+j}, '${schedule_start.format('YYYY-MM-DD')}', '${schedule_end.format('YYYY-MM-DD')}', ${delivery}, ${insurance},${price}, ${is_paid}, ${i+1}, ${id_bike})
    `;
    con.query(sql_order, function (err, result) {
      if (err) throw err;
      console.log(`La commande ${5*i+j} pour l'utilisateur ${firstname} ${lastname.toUpperCase()} a bien été ajoutée`);
    });
  }
}

// compte admin

const lastname = "admin";
const firstname = "admin";
const birthdate = dayjs (faker.date.birthdate({min: 18, max: 65, mode: 'age'}));
const address = faker.address.streetAddress().replaceAll("'", "''");
const email = "admin@admin.fr";
const password_user = "admin";
const sql_user = `
  INSERT INTO users (id_user, lastname, firstname, birthdate, address, email, password_user, is_admin) 
  VALUES (6, '${lastname}', '${firstname}', '${birthdate.format('YYYY-MM-DD')}', '${address}', '${email}', '${password_user}', true)
`;
con.query(sql_user, function (err, result) {
  if (err) throw err;
  console.log(`L'utilisateur ${firstname} ${lastname.toUpperCase()} a bien été ajoutée`);
});