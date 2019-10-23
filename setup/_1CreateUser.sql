CREATE ROLE order_app_user WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'Tester321!';
	
	
-- Database: app_db
DROP DATABASE order_app;
CREATE DATABASE order_app
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

GRANT CONNECT ON DATABASE order_app TO order_app_user;
GRANT ALL ON DATABASE order_app TO postgres;
GRANT TEMPORARY, CONNECT ON DATABASE order_app TO PUBLIC;



-- SCHEMA: order_app
\connect order_app
CREATE SCHEMA order_app
    AUTHORIZATION postgres;

COMMENT ON SCHEMA order_app
    IS 'standard public schema';

GRANT ALL ON SCHEMA order_app TO postgres;

GRANT ALL ON SCHEMA order_app TO order_app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA order_app
GRANT DELETE, UPDATE, SELECT, INSERT ON TABLES TO order_app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA order_app
GRANT ALL ON SEQUENCES TO order_app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA order_app
GRANT EXECUTE ON FUNCTIONS TO order_app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA order_app
GRANT USAGE ON TYPES TO order_app_user;



CREATE TABLE order_app.clients_table
(
    id serial NOT NULL,
    surname VARCHAR(15) NOT NULL,
    firstnames VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    phone VARCHAR(15) NOT NULL,
    country VARCHAR(15) NOT NULL,
    CONSTRAINT clients_id PRIMARY KEY (id),
    CONSTRAINT clients_id UNIQUE (id)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE order_app.suppliers_table
(
    id serial NOT NULL,
    surname VARCHAR(15) NOT NULL,
    firstnames VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    phone VARCHAR(15) NOT NULL,
    country VARCHAR(15) NOT NULL,
    website VARCHAR(100) NOT NULL,
    CONSTRAINT supplier_id PRIMARY KEY (id),
    CONSTRAINT supplier_id UNIQUE (id)
)
WITH (
    OIDS = FALSE
);
ALTER TABLE order_app.clients_table
    OWNER to postgres;
	
	
CREATE TABLE order_app.suppliers_table
(
    id serial NOT NULL,
    surname VARCHAR(15) NOT NULL,
    firstnames VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    phone VARCHAR(15) NOT NULL,
    country VARCHAR(15) NOT NULL,
    website VARCHAR(100) NOT NULL,
    CONSTRAINT supplier_id PRIMARY KEY (id),
    CONSTRAINT supplier_id UNIQUE (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE order_app.suppliers_table
    OWNER to postgres;