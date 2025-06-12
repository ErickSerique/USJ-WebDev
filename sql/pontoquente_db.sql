CREATE DATABASE IF NOT EXISTS pontoquente_db;
USE pontoquente_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(60) NOT NULL,
    nascimento DATE NOT NULL,
    sexo ENUM('masculino', 'feminino', 'outro') NOT NULL,
    nome_materno VARCHAR(60) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone_celular CHAR(12) NOT NULL,
    telefone_fixo CHAR(12),
    endereco TEXT NOT NULL,
    login VARCHAR(6) NOT NULL UNIQUE,
    senha VARCHAR(8) NOT NULL);