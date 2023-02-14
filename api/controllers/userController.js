const { query } = require("../services/database");

const userController = {
    getAll(){
        const sqlGetAll = `
            SELECT * 
            FROM users
            ORDER BY lastname, firstname
        `;
        return query(sqlGetAll);
    },
    getById(id){
        const sqlGetById = `
            SELECT * 
            FROM users 
            WHERE id_user = ?
        `;
        return query(sqlGetById, [id]);
    },

    async postOne({lastname, firstname, birthdate, address, email, passwordUser}){
        const sqlPostOne = `
            INSERT INTO users (lastname, firstname, birthdate, address, email, password_user) 
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const results =  await query(sqlPostOne, [lastname, firstname, birthdate, address, email, passwordUser]);

        const insertId = results.insertId;
        return this.getById(insertId);
    },
    postUserByEmailAndPassword({email, passwordUser}){
        const sqlGetUserByEmailAndPassword = `
            SELECT id_user, lastname, firstname, birthdate, address, email 
            FROM users
            WHERE email = ? AND password_user = ?
        `;
        return query(sqlGetUserByEmailAndPassword, [email, passwordUser]);
    },

    async putOne(idUser, {lastname, firstname, birthdate, address, email, passwordUser}){
        const sqlputOne = `
            UPDATE users
            SET lastname = ?, firstname = ?, birthdate = ?, address = ?, email = ?, password_user = ?
            WHERE id_user = ?;
        `;
        await query(sqlputOne, [lastname, firstname, birthdate, address, email, passwordUser, idUser]);
        return this.getById(idUser);
    },

    deleteOne(id){
        const sqlDeleteOne = `
            DELETE FROM users 
            WHERE id_user = ?
        `;
        return query(sqlDeleteOne, [id]);
    }
}
module.exports = userController;