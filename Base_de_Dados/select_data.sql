SELECT * FROM tbl_utilizadores;

SELECT id, nome FROM tbl_utilizadores;

SELECT tbl_utilizadores.id, tbl_prestador.id FROM tbl_utilizadores, tbl_prestador;

SELECT
   tbl_orcamento.id,
   total,
   tbl_utilizadores.id,
   nome
From
   tbl_orcamento,
   tbl_utilizadores
WHERE
   tbl_orcamento.id_utilizadores = "8cc5307e-7958-4ad4-847c-9b2969ff4c4b";
   
   SELECT * FROM tbl_servicos;
   
   SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = "8cc5307e-7958-4ad4-847c-9b2969ff4c4b";
   
   SELECT * FROM tbl_prestador WHERE tbl_prestador.nif = "1433566"
   