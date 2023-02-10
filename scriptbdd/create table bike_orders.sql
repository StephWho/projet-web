CREATE TABLE IF NOT EXISTS bike_orders (
    id_bike_order INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    schedule_start DATETIME NOT NULL,
    schedule_end DATETIME NOT NULL,
    delivery BOOLEAN NOT NULL,
    insurance BOOLEAN NOT NULL,
    id_user INT (6) NOT NULL,
    id_bike INT (6) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_bike) REFERENCES bikes (id_bike)
)