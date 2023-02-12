const { query } = require("../services/database");

const UserController = {
    getAll(){
        const sql = "SELECT * FROM users";
        return query(sql);
    }
}

module.exports = UserController;