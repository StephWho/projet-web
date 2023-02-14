const { query } = require("../services/database");

const brandController = {
    getAll(){
        const sqlGetAll = `
            SELECT * 
            FROM brands
            ORDER BY brand_value
        `;
        return query(sqlGetAll);
    },
    getById(id){
        const sqlGetById = `
            SELECT * 
            FROM brands 
            WHERE id_brand = ?
        `;
        return query(sqlGetById, [id]);
    },

    async postOne({brandValue}){
        const sqlPostOne = `
            INSERT INTO brands (brand_value) 
            VALUES (?);
        `;
        const results =  await query(sqlPostOne, [brandValue]);

        const insertId = results.insertId;
        return this.getById(insertId);
    },

    async putOne(idBrand, {brandValue}){
        const sqlputOne = `
            UPDATE brands
            SET brand_value = ?
            WHERE id_brand = ?;
        `;
        await query(sqlputOne, [brandValue, idBrand]);
        return this.getById(idBrand);
    },

    deleteOne(id){
        const sqlDeleteOne = `
            DELETE FROM brands 
            WHERE id_brand = ?
        `;
        return query(sqlDeleteOne, [id]);
    }    
}

module.exports = brandController;