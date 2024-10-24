CREATE DATABASE dbFeatUp;
USE dbFeatUp;

CREATE TABLE produtor (
	idProdutor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    aplicativo VARCHAR(45),
    genero VARCHAR(45)
);

INSERT INTO produtor (nome, aplicativo, genero) VALUES
('João Silva', 'FL Studio', 'Masculino'),
('Maria Oliveira', 'Ableton Live', 'Feminino'),
('Carlos Souza', 'Logic Pro', 'Masculino'),
('Ana Santos', 'GarageBand', 'Feminino'),
('Lucas Lima', 'Pro Tools', 'Masculino');
