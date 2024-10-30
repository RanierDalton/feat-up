CREATE DATABASE dbFeatUp;
USE dbFeatUp;

CREATE TABLE produtor (
	idProdutor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    alias VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(400) NOT NULL,
    pathFotoPerfil VARCHAR(200) UNIQUE,
    pontoForte VARCHAR(12) NOT NULL,
    aplicativo VARCHAR(45) NOT NULL,
    codigoBackUp CHAR(5),
    lastLogin DATETIME,
    CONSTRAINT chkPontoForte CHECK(pontoForte IN ('Instrumental','Beat','Mix','Master'))
);

CREATE TABLE feat (
	idFeat INT PRIMARY KEY AUTO_INCREMENT,
    dtFeat DATETIME NOT NULL DEFAULT now(),
    statusFeat TINYINT NOT NULL DEFAULT 0,
    fkProdutorSolicita INT NOT NULL,
    fkProdutorAceita INT NOT NULL,
    CONSTRAINT chkStatusFeat CHECK(statusFeat IN (0, 1, 2)),
    CONSTRAINT fkProdutorSolicitaFeat FOREIGN KEY (fkProdutorSolicita) REFERENCES produtor(idProdutor),
    CONSTRAINT fkProdutorAceitaFeat FOREIGN KEY (fkProdutorAceita) REFERENCES produtor(idProdutor)
);

CREATE TABLE rede_social (
	idRede INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
    url VARCHAR(150),
    fontAwesomeTag VARCHAR(45)
);

CREATE TABLE rede_produtor (
	fkProdutor INT NOT NULL,
    fkRede INT NOT NULL,
    usuario VARCHAR(45) NOT NULL,
    PRIMARY KEY(fkProdutor, fkRede),
    CONSTRAINT fkProdutorUsuario FOREIGN KEY (fkProdutor) REFERENCES produtor(idProdutor),
    CONSTRAINT fkRedeUsuario FOREIGN KEY (fkRede) REFERENCES rede_social(idRede)
);

CREATE TABLE genero (
	idGenero INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE genero_produtor (
	fkProdutor INT NOT NULL,
    fkGenero INT NOT NULL,
    CONSTRAINT fkProdutorGenero FOREIGN KEY (fkProdutor) REFERENCES produtor(idProdutor),
    CONSTRAINT fkGeneroProdutor FOREIGN KEY (fkGenero) REFERENCES genero(idGenero)
);

INSERT INTO produtor (nome, alias, senha, email, descricao, pontoForte, aplicativo) VALUES
('Carlos Almeida', 'DJ Alme', 'senha123', 'carlos.almeida@example.com', 'Produtor focado em beats eletrônicos.', 'Beat', 'FL Studio'),
('Ana Souza', 'AnaBeats', 'senha456', 'ana.souza@example.com', 'Apaixonada por trap e hip-hop.', 'Instrumental', 'Ableton Live'),
('Marcos Silva', 'MK Sound', 'senha789', 'marcos.silva@example.com', 'Produtor de pop e eletrônico.', 'Master', 'Logic Pro'),
('Beatriz Costa', 'BiaMix', 'senha321', 'beatriz.costa@example.com', 'Especialista em mixagem para rock e pop.', 'Mix', 'Pro Tools'),
('José Santos', 'ZéBeats', 'senha654', 'jose.santos@example.com', 'Criador de beats para trap e rap.', 'Beat', 'FL Studio'),
('Rafael Oliveira', 'RafMix', 'senha555', 'rafael.oliveira@example.com', 'Mixagem e masterização de qualidade.', 'Mix', 'Cubase'),
('Larissa Gomes', 'LariSound', 'senha999', 'larissa.gomes@example.com', 'Produtora e engenheira de som.', 'Instrumental', 'Logic Pro'),
('Pedro Rocha', 'PRock', 'senha888', 'pedro.rocha@example.com', 'Especialista em beats de trap.', 'Beat', 'Ableton Live'),
('Carla Martins', 'CarlaM', 'senha777', 'carla.martins@example.com', 'Produção de beats para hip-hop.', 'Beat', 'FL Studio'),
('Fábio Lima', 'FabSound', 'senha222', 'fabio.lima@example.com', 'Engenheiro de som para pop.', 'Master', 'Pro Tools');

INSERT INTO rede_social (nome, url, fontAwesomeTag) VALUES
('Instagram', 'https://instagram.com/', 'fa-square-instagram'),
('Twitter', 'https://twitter.com/', 'fa-square-x-twitter'),
('Facebook', 'https://facebook.com/', 'fa-square-facebook'),
('YouTube', 'https://youtube.com/', 'fa-square-youtube'),
('SoundCloud', 'https://soundcloud.com/', 'fa-soundcloud'),
('Spotify', 'https://spotify.com/', 'fa-spotify'),
('TikTok', 'https://tiktok.com/@', 'fa-tiktok'),
('LinkedIn', 'https://linkedin.com/in/', 'fa-linkedin'),
('Deezer', 'https://deezer.com/profile/', 'fa-deezer'),
('Bandcamp', 'https://bandcamp.com/', 'fa-bandcamp'),
('Twitch', 'https://twitch.tv/', 'fa-twitch'),
('Reddit', 'https://reddit.com/u/', 'fa-square-reddit');

INSERT INTO genero (nome) VALUES
('Hip Hop'),
('Trap'),
('Rock'),
('Pop'),
('Eletrônica'),
('Jazz'),
('Reggae'),
('R&B'),
('Funk'),
('Sertanejo');

INSERT INTO genero_produtor (fkProdutor, fkGenero) VALUES
(1, 1),  -- Hip Hop
(1, 2),  -- Trap

(2, 3),  -- Rock

(3, 4),  -- Pop

(4, 5),  -- Eletrônica
(4, 7),  -- Reggae

(5, 1),  -- Hip Hop
(5, 8),  -- R&B

(6, 6),  -- Jazz

(7, 3),  -- Rock
(7, 9),  -- Funk

(8, 2),  -- Trap

(9, 10), -- Sertanejo
(9, 4),  -- Pop

(10, 5); -- Eletrônica


-- Associando cada produtor a pelo menos uma rede social
INSERT INTO rede_produtor (fkProdutor, fkRede, usuario) VALUES
(1, 1, 'dj_alme_insta'),  -- Instagram
(1, 4, 'dj_alme_yt'),     -- YouTube

(2, 2, 'ana_beats'),      -- Twitter
(2, 5, 'ana_beats_sc'),   -- SoundCloud

(3, 3, 'mksound_fb'),     -- Facebook
(3, 6, 'mksound_spotify'),-- Spotify

(4, 8, 'bia_mix'),        -- LinkedIn
(4, 9, 'bia_mix_dzr'),    -- Deezer

(5, 1, 'zebeats_insta'),  -- Instagram
(5, 11, 'zebeats_tw'),    -- Twitch

(6, 2, 'rafmix_tw'),      -- Twitter
(6, 4, 'rafmix_yt'),      -- YouTube

(7, 10, 'larisound_bc'),  -- Bandcamp
(7, 3, 'larisound_fb'),   -- Facebook

(8, 5, 'prock_sc'),       -- SoundCloud
(8, 12, 'prock_reddit'),  -- Reddit

(9, 7, 'carla_m_tiktok'), -- TikTok
(9, 6, 'carla_m_spotify'),-- Spotify

(10, 1, 'fabsound_insta'),-- Instagram
(10, 8, 'fabsound_li');   -- LinkedIn

INSERT INTO feat (dtFeat, statusFeat, fkProdutorSolicita, fkProdutorAceita) VALUES
-- Feats pendentes
('2024-01-15 14:30:00', 0, 1, 2),  -- DJ Alme convida AnaBeats
('2024-02-20 11:00:00', 0, 3, 4),  -- MK Sound convida BiaMix
('2024-03-10 09:15:00', 0, 5, 6),  -- ZéBeats convida RafMix

-- Feats aceitos
('2024-04-05 17:45:00', 1, 2, 1),  -- AnaBeats aceita convite de DJ Alme
('2024-05-12 19:30:00', 1, 7, 3),  -- LariSound convida MK Sound e é aceito
('2024-06-18 13:20:00', 1, 6, 8),  -- RafMix convida PRock e é aceito
('2024-07-25 20:50:00', 1, 9, 10), -- CarlaM convida FabSound e é aceito

-- Feats recusados
('2024-08-01 10:40:00', 2, 3, 7),  -- MK Sound convida LariSound, mas é recusado
('2024-09-07 16:15:00', 2, 4, 5),  -- BiaMix convida ZéBeats, mas é recusado
('2024-10-10 08:25:00', 2, 8, 9);  -- PRock convida CarlaM, mas é recusado

-- ----------------------------
-- SRCIPTS DO PRÓPRIO SISTEMA
-- ----------------------------

-- SCRIPT DE LOGIN
-- SELECT COUNT(idProdutor) FROM produtor WHERE alias = apelidoInformado AND senha = senhaInformada;
-- ------------------------------------------------------------------------------------------------

-- SCRIPT DE CADASTRO
-- INSERT INTO produtor (nome, alias, senha, email, descricao, pontoForte, aplicativo) VALUES (nome, apelido, senha, email, descricao, pontoForte, aplicativo);
-- SELECT idProdutor FROM produtor WHERE alias = alias que acabou de cadastrar;
-- INSERT INTO rede_produtor (fkProdutor, fkRede, usuario) VALUES (idProdutor, idRede, user); FAZER LOOP EM CASO DE MAIS DE UMA REDE
-- INSERT INTO genero_produtor (fkProdutor, fkGenero) VALUES (idProdutor, idGenero),  FAZER LOOP EM CASO DE MAIS DE UM GENERO
-- SCRIPT MOSTRAR PRODUTORES PARA FEAT
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE adicionar genero de acordo com os generos que o user que acessou;
-- ------------------------------------------------------------------------------------------------

-- SCRIPT MOSTRAR CONVITES PARA FEAT
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero JOIN feat ON idProdutor = feat.fkProdutorSolicita WHERE feat.statusFeat = 0 AND fkProdutorAceita = idProdutorConvidado LIMIT 2;
-- --------------------------------------------------------------------------------------------------

-- SCRIPT PARA MOSTRAR OS FEATS FEITOS 
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero JOIN feat ON idProdutor = feat.fkProdutorSolicita WHERE feat.statusFeat = 1 AND fkProdutorAceita = idProdutorConvidado LIMIT 2;
-- -------------------------------------------------------------------------------------------------

-- SCRIPT PARA ACESSAR INFORMAÇÕES DO PERFIL DE USUÁRIO
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE idProdutor = idPerfilQueUserClicou;
-- --------------------------------------------------------------------------------------------------

-- SCRIPT PARA EDITAR O PERFIL DO USUÁRIO
-- UPDATE produtor SET cada campo igual ao input dos perfil WHERE idProdutor = idProdutor perfil;
-- UPDATE rede_produtor SET usuario = usuarioInformado WHERE fkProdutor = idprodutoratualizar AND fkRede = redeInformada; ATUALIZAR EM LOOP TODAS AS REDES DO PRODUTOR QUE JA EXISTIREM
-- POREM INSERIR UMA REDE CASO O PRODUTOR NÃO TENHA CADASTRADO
-- UPDATE genero_produtor SET usuario = usuarioInformado WHERE fkProdutor = idprodutoratualizar AND fkRede = redeInformada; ATUALIZAR EM LOOP TODAS OS GENEROS DO PRODUTOR QUE JA EXISTIREM
-- POREM INSERIR UM GENERO CASO O PRODUTOR NÃO TENHA CADASTRADO
-- --------------------------------------------------------------------------------------------------

-- SCRIPT PARA ATUALIZAR STATUS DE UM FEAT 
-- UPDATE feat SET statusFeat WHERE idProdutorAceita = idProdutorClicouAceitar AND idProdutorSolicita = idProdutorSolicitou;
-- --------------------------------------------------------------------------------------------------

-- SCRIPT INSERIR UM NOVO FEAT 
-- INSERT INTO feat (dtFeat, fkProdutorSolicita, fkProdutorAceita) VALUES (now(), idSolicita, idAceita);

-- ----------------------------
-- SRCIPTS DA DASHBOARD
-- ----------------------------

-- SCRIPT USUARIOS TOTAL
-- SELECT COUNT(idProdutor) FROM produtor;

-- SCRIPT USUARIOS ATIVO
-- SELECT COUNT(idProdutor) FROM produtor WHERE TIMESTAMPDIFF(DAY,now(),lastLogin) <= 10;

-- SCRIPT FEATS FEITOS
-- SELECT COUNT(idFeat) FROM feat;

-- SCRIPT GENEROS MAIS USADOS
-- SELECT COUNT(fkGenero), nome as genero FROM genero_produtor JOIN genero ON genero.idGenero = fkGenero GROUP BY fkGenero;

-- SCRIPT STATUS DOS FEATS
-- SELECT COUNT(statusFeat), CASE WHEN statusFeat = 0 THEN 'Pendente' WHEN statusFeat = 1 THEN 'Aceito' ELSE 'Recusado' END AS stausFeat FROM feat GROUP BY statusFeat;

-- SCRIPT APPS MAIS USADOS
-- SELECT COUNT(aplicativo), aplicativo FROM produtor GROUP BY aplicativo;