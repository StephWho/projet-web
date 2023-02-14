const { query } = require("../services/database");

const typeController = {
  getAll() {
    const sqlGetAll = `
        SELECT * 
        FROM types
        ORDER BY id_type
    `;
    return query(sqlGetAll);
  },
  getById(id) {
    const sqlGetById = `
        SELECT * 
        FROM types 
        WHERE id_type = ?
    `;
    return query(sqlGetById, [id]);
  },

  async postOne({ typeValue }) {
    const sqlPostOne = `
        INSERT INTO types (type_value) 
        VALUES (?);
    `;
    const results = await query(sqlPostOne, [typeValue]);

    const insertId = results.insertId;
    return this.getById(insertId);
  },

  async putOne(idType, { typeValue }) {
    const sqlputOne = `
        UPDATE types
        SET type_value = ?
        WHERE id_type = ?;
    `;
    await query(sqlputOne, [typeValue, idType]);
    return this.getById(idType);
  },

  deleteOne(id) {
    const sqlDeleteOne = `
        DELETE FROM types 
        WHERE id_type = ?
    `;
    return query(sqlDeleteOne, [id]);
  },
};

module.exports = typeController;
