Características
Trata-se de um sistema para gerenciar a reservas de veículos, a API deve disponibilizar as seguintes rotas:

[x]Login


Rota para cadastramento de usuário
Rota para edição e remoção de usuário

[x] Rota para cadastramentos de veículos
[X] Rota para edição e remoção de veículos

Rota para listagem de veículos cadastrados

Rota para reserva de veículo 
Rota para liberação de veículo reservado
Rota para a listagem de veículos associados a um usuário

É um sistema de reserva e não de locação, portanto, não deve envolver cálculos de pagamento.
 

QA :
    [x] LOGIN
            Login Susseso e Erro
            JWT Autenticado
    [x] USERS
       [] Mudança não funciona
    [x] Criar usuario funcio e pega erro de duplicadade
    [x] Valide tras dados sensiveis
    [x] Deletar usuario tropa permissões e gera erro
    
    Carros
        [] Reservas falta paramentro id para reservar
        [] Não deve ser possível reservar um veículo já reservado.
        [] Não deve ser possível um usuário reservar mais de um veículo.
        [x] Filtro funciona
        [x] Delete e Get all Funciona

Regras
[x] As rotas com exceção da rota de login devem ser protegidas com o uso de token.
 
Entrega
A entrega do projeto deve ser feita via GIT, e o repositório compartilhado para os seguintes usuários: diegoa83 e dcastrohappmobi, após o compartilhamento você deve enviar um e-mail confirmando a entrega para: diego@happmobi.com.br e daniel.castro@happmobi.com.br.

Prazo
O prazo limite para a entrega é 16/09/2025

Critérios de avaliação
Implementação da API
Implantação das Rotas
Proteção das Rotas
Regras de Negócio
Tecnologias Utilizadas
Estrutura e Organização do Código
Clareza e Manutenibilidade do Código
Organização de Arquivos


Diferenciais na entrega
Implantação de testes
Conteinerização da aplicação com Docker
Documentação com Swagger

 
Obrigado pela disponibilidade, qualquer dúvida estamos à disposição