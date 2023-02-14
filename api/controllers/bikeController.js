const { query } = require("../services/database");

const bikeController = {
  getAll() {
    const sqlGetAll = `
        SELECT id_bike, type_value, size_value, brand_value 
        FROM bikes 
        INNER JOIN types ON bikes.id_type = types.id_type 
        INNER JOIN sizes ON bikes.id_size = sizes.id_size 
        INNER JOIN brands ON bikes.id_brand = brands.id_brand
        ORDER BY id_bike DESC
    `;
    return query(sqlGetAll);
  },
  getById(id) {
    const sqlGetById = `
        SELECT id_bike, type_value, size_value, brand_value 
        FROM bikes 
        INNER JOIN types ON bikes.id_type = types.id_type 
        INNER JOIN sizes ON bikes.id_size = sizes.id_size 
        INNER JOIN brands ON bikes.id_brand = brands.id_brand 
        WHERE id_bike = ?
    `;
    return query(sqlGetById, [id]);
  },

  async postOne({ idType, idSize, idBrand }) {
    const sqlPostOne = `
        INSERT INTO bikes (id_type, id_size, id_brand) 
        VALUES (?, ?, ?)
    `;
    const results = await query(sqlPostOne, [idType, idSize, idBrand]);

    const insertId = results.insertId;
    return this.getById(insertId);
  },

  async putOne(idBike, { idType, idSize, idBrand }) {
    const sqlputOne = `
        UPDATE bikes
        SET id_type = ?, id_size = ?, id_brand = ?
        WHERE id_bike = ?;
    `;
    await query(sqlputOne, [idType, idSize, idBrand, idBike]);
    return this.getById(idBike);
  },

  deleteOne(id) {
    const sqlDeleteOne = `
        DELETE FROM bikes 
        WHERE id_bike = ?
    `;
    return query(sqlDeleteOne, [id]);
  },
};

module.exports = bikeController;
