const { query } = require("../services/database");

const sizeController = {
  getAll() {
    const sqlGetAll = `
        SELECT * 
        FROM sizes
        ORDER BY id_size
    `;
    return query(sqlGetAll);
  },
  getById(id) {
    const sqlGetById = `
        SELECT * 
        FROM sizes 
        WHERE id_size = ?
    `;
    return query(sqlGetById, [id]);
  },

  async postOne({ sizeValue }) {
    const sqlPostOne = `
        INSERT INTO sizes (size_value) 
        VALUES (?);
    `;
    const results = await query(sqlPostOne, [sizeValue]);

    const insertId = results.insertId;
    return this.getById(insertId);
  },

  async putOne(idSize, { sizeValue }) {
    const sqlputOne = `
        UPDATE sizes
        SET size_value = ?
        WHERE id_size = ?;
    `;
    await query(sqlputOne, [sizeValue, idSize]);
    return this.getById(idSize);
  },

  deleteOne(id) {
    const sqlDeleteOne = `
        DELETE FROM sizes 
        WHERE id_size = ?
    `;
    return query(sqlDeleteOne, [id]);
  },
};

module.exports = sizeController;
