CREATE TABLE IF NOT EXISTS users (
    id_user INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    adress VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false NOT NULL,
    id_bike INT (6) NOT NULL,
    FOREIGN KEY (id_bike) REFERENCES bikes (id_bike)
)