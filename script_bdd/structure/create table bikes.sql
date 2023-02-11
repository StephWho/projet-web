CREATE TABLE IF NOT EXISTS bikes (
    id_bike INT (6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_type INT (6) NOT NULL,
    id_size INT (6) NOT NULL,
    id_brand INT (6) NOT NULL,
    FOREIGN KEY (id_type) REFERENCES bike_types (id_bike_type),
    FOREIGN KEY (id_size) REFERENCES bike_sizes (id_bike_size),
    FOREIGN KEY (id_brand) REFERENCES bike_brands (id_bike_brand)
)