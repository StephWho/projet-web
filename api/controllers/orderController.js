const { query } = require("../services/database");

const orderController = {
  getAll() {
    const sqlGetAll = `
        SELECT id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, orders.id_user, orders.id_bike
        FROM orders
        INNER JOIN users ON orders.id_user = users.id_user 
        INNER JOIN bikes ON orders.id_bike = bikes.id_bike 
        ORDER BY id_order DESC
    `;
    return query(sqlGetAll);
  },
  getOneById(id) {
    const sqlGetById = `
        SELECT id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, orders.id_user, orders.id_bike
        FROM orders 
        INNER JOIN users ON orders.id_user = users.id_user 
        INNER JOIN bikes ON orders.id_bike = bikes.id_bike  
        WHERE id_order = ?
        `;
    return query(sqlGetById, [id]);
  },

  getAllByIdUser(id) {
    const sqlGetAllByIdUser = `
            SELECT id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, orders.id_user, orders.id_bike
            FROM orders 
            INNER JOIN users ON orders.id_user = users.id_user 
            INNER JOIN bikes ON orders.id_bike = bikes.id_bike  
            WHERE orders.id_user = ?
        `;
    return query(sqlGetAllByIdUser, [id]);
  },

  getAllPaid(isPaid) {
    let isPaidSQL;
    if (isPaid == "true") {
      isPaidSQL = 1;
    } else if (isPaid == "false") {
      isPaidSQL = 0;
    }
    const sqlGetAllPaid = `
        SELECT id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, orders.id_user, orders.id_bike
        FROM orders
        INNER JOIN users ON orders.id_user = users.id_user
        INNER JOIN bikes ON orders.id_bike = bikes.id_bike 
        WHERE is_paid = ?
    `;
    return query(sqlGetAllPaid, [isPaidSQL]);
  },
  getAllAlreadyPlaced(placed) {
    let sqlGetAllAlreadyPlaced;
    if (placed == "before") {
      sqlGetAllAlreadyPlaced = `
            SELECT id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, orders.id_user, orders.id_bike 
            FROM orders 
            INNER JOIN users ON orders.id_user = users.id_user 
            INNER JOIN bikes ON orders.id_bike = bikes.id_bike 
            WHERE schedule_end < now()
        `;
    } else if (placed == "after") {
      sqlGetAllAlreadyPlaced = `
            SELECT id_order, schedule_start, schedule_end, delivery, insurance, price, is_paid, orders.id_user, orders.id_bike 
            FROM orders 
            INNER JOIN users ON orders.id_user = users.id_user 
            INNER JOIN bikes ON orders.id_bike = bikes.id_bike 
            WHERE schedule_end > now()
        `;
    }
    return query(sqlGetAllAlreadyPlaced);
  },

  async postOne({
    scheduleStart,
    scheduleEnd,
    delivery,
    insurance,
    price,
    isPaid,
    idUser,
    idBike,
  }) {
    const sqlPostOne = `
        INSERT INTO orders (schedule_start, schedule_end, delivery, insurance, price, is_paid, id_user, id_bike) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const results = await query(sqlPostOne, [
      scheduleStart,
      scheduleEnd,
      delivery,
      insurance,
      price,
      isPaid,
      idUser,
      idBike,
    ]);

    const insertId = results.insertId;
    return this.sqlPostOne(insertId);
  },

  async putOne(
    idOrder,
    {
      scheduleStart,
      scheduleEnd,
      delivery,
      insurance,
      price,
      isPaid,
      idUser,
      idBike,
    }
  ) {
    const sqlputOne = `
        UPDATE orders
        SET schedule_start = ?, schedule_end = ?, delivery = ?, insurance = ?, price = ?, is_paid = ?, id_user = ?, id_bike = ?
        WHERE id_order = ?;
    `;
    await query(sqlputOne, [
      scheduleStart,
      scheduleEnd,
      delivery,
      insurance,
      price,
      isPaid,
      idUser,
      idBike,
      idOrder,
    ]);
    return this.sqlputOne(idOrder);
  },

  deleteOne(id) {
    const sqlDeleteOne = `
        DELETE FROM orders 
        WHERE id_order = ?
    `;
    return query(sqlDeleteOne, [id]);
  },
};

module.exports = orderController;
