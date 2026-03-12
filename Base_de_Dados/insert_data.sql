INSERT INTO tbl_utilizadores (id, nome, numero_identificacao, data_nascimento, email, telefone, pais, localidade, `password`, enabled, create_at, updated_at) 
VALUES (
"8cc5307e-7958-4ad4-847c-9b2969ff4c4b",
"Helio Barbosa",
"M001S",
"1997-03-22",
"barbosahifb1997@gmail.com",
"9854730",
"Cabo Verde",
"Ponta d Agua",
"$2a$12$eLglGVMT2PJwLqzPzCos7.3TekbwRCMhOfq0vXx8ihzGriyGW2Ltq",
true,
NOW(),
NOW()
);

INSERT INTO tbl_orcamento
VALUES (
   NULL,
   200,
   "8cc5307e-7958-4ad4-847c-9b2969ff4c4b",
   true,
   NOW(),
   NOW()
   );
   
   INSERT INTO tbl_servicos
   VALUES (
     NULL,
     "Contabilidade",
     "Realizar contabilidade em pequenas e grandes empresas",
     "Contabilidade",
     true,
     NOW(),
     NOW()
   );
   
   INSERT INTO tbl_prestador
   VALUES (
   "9a5d7c3b-2f1a-4c6d-9b1f-4d8e12345678",
   1433566,
   "Contabelista",
   0.2,
   1000,
   0.1,
   true,
   true,
   NOW(),
   NOW()
   );
   
   INSERT INTO tbl_prestacao_servico
   VALUES (
     NULL,
     "Formação superior em Contabilidade",
     2000,
     8,
     "21b9c02c-7c6c-4cbf-b021-63fb4c698e27",
     1,
     20,
     "pendente",
     1,
     true,
     NOW(),
     NOW()
     );
     
     INSERT INTO tbl_utilizadores
     VALUE (
     "5b36eb75-4ec3-4790-8d92-ca9a2b9c77e9",
     "Carlos Tavares",
     "M002S",
     "1997-03-21",
     "heliofurtado@gmail.com",
     "9854730",
     "Cabo Verde",
     "Ponta d agua",
     "$2a$12$GVZJ/zuh0H8WtxlfgZGas.PNCyq6VMhrBnvyaai9LlCvRnEjM3.qy",
     true,
     NOW(),
     NOW()
     )
   
   
   