-- Crear la base de datos 'transfers'
CREATE DATABASE IF NOT EXISTS transfers;

-- Crear la tabla 'transfers' si no existe
CREATE TABLE
    IF NOT EXISTS transfers (
        id SERIAL PRIMARY KEY,
        sender VARCHAR(100),
        receiver VARCHAR(100),
        amount NUMERIC(10, 2),
        transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        commune VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Insertar datos de prueba
INSERT INTO
    transfers (sender, receiver, amount, transfer_date, commune)
VALUES
    ('John Doe', 'Jane Smith', 100.50, CURRENT_TIMESTAMP, 'Commune A'),
    ('Alice Johnson', 'Bob Brown', 250.75, CURRENT_TIMESTAMP, 'Commune B'),
    (
        'Charlie Davis',
        'Dana White',
        300.00,
        CURRENT_TIMESTAMP,
        'Commune C'
    );
