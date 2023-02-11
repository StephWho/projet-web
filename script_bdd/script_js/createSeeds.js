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

// créer les seeds

const types = ['VTT', 'VTC', 'BMX', 'Velo de route'];
types.forEach(type => {
  const sql_type = `INSERT INTO bike_types (type_value) VALUES ('${type}')`;
  con.query(sql_type, function (err, result) {
    if (err) throw err;
    console.log("La ligne pour type a bien été ajoutée");
  });
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
sizes.forEach(size => {
  const sql_size = `INSERT INTO bike_sizes (size_value) VALUES ('${size}')`;
  con.query(sql_size, function (err, result) {
    if (err) throw err;
    console.log("La ligne pour size a bien été ajoutée");
  });
});

const brands = ['BTWIN', 'MONGOOSE', 'RIVERSIDE', 'ROCKRIDE'];
brands.forEach(brand => {
  const sql_brand = `INSERT INTO bike_brands (brand_value) VALUES ('${brand}')`;
  con.query(sql_brand, function (err, result) {
    if (err) throw err;
    console.log("La ligne pour brand a bien été ajoutée");
  });
});
