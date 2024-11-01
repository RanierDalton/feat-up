






// -- SCRIPT MOSTRAR CONVITES PARA FEAT
// -- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero JOIN feat ON idProdutor = feat.fkProdutorSolicita WHERE feat.statusFeat = 0 AND fkProdutorAceita = idProdutorConvidado LIMIT 2;
// -- --------------------------------------------------------------------------------------------------

// -- SCRIPT PARA MOSTRAR OS FEATS FEITOS 
// -- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero JOIN feat ON idProdutor = feat.fkProdutorSolicita WHERE feat.statusFeat = 1 AND fkProdutorAceita = idProdutorConvidado LIMIT 2;
// -- -------------------------------------------------------------------------------------------------

// -- SCRIPT PARA ATUALIZAR STATUS DE UM FEAT 
// -- UPDATE feat SET statusFeat WHERE idProdutorAceita = idProdutorClicouAceitar AND idProdutorSolicita = idProdutorSolicitou;
// -- --------------------------------------------------------------------------------------------------

// -- SCRIPT INSERIR UM NOVO FEAT 
// -- INSERT INTO feat (dtFeat, fkProdutorSolicita, fkProdutorAceita) VALUES (now(), idSolicita, idAceita);

// -- SCRIPT FEATS FEITOS
// -- SELECT COUNT(idFeat) FROM feat;

// -- SCRIPT STATUS DOS FEATS
// -- SELECT COUNT(statusFeat), CASE WHEN statusFeat = 0 THEN 'Pendente' WHEN statusFeat = 1 THEN 'Aceito' ELSE 'Recusado' END AS stausFeat FROM feat GROUP BY statusFeat;