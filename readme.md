# Sistema de Reserva de Veículos

Este sistema permite gerenciar reservas de veículos, sem envolver cálculos de pagamento. Ele é dividido em duas aplicações: **Backend (API)** e **Frontend**.

## Características da API

### Usuários

* `[x]` Login (retorna JWT)
* Cadastro de usuário
* Edição e remoção de usuário

### Veículos

* `[x]` Cadastro de veículo
* `[x]` Edição e remoção de veículo
* Listagem de veículos cadastrados

### Reservas

* Reserva de veículo
* Liberação de veículo reservado
* Listagem de veículos associados a um usuário

> Observação: O sistema é de **reserva**, não de locação. Não há cálculos de pagamento.

## QA (Quality Assurance)

### Login

* `[x]` Login com sucesso e erro
* `[x]` JWT autenticado

### Usuários

* `[ ]` Edição de usuário não funciona
* `[x]` Criar usuário funciona, captura erro de duplicidade
* `[x]` Validação de dados sensíveis
* `[x]` Deletar usuário gera erro sem permissões

### Veículos

* `[x]` Criar veículo
* `[ ]` Reserva Veiculo
* `[X]` Não reservar veículo já reservado
* `[x]` Usuário não pode reservar mais de um veículo
* `[x]` Filtro funciona
* `[x]` Delete e Get All funcionam

### Regras

* `[x]` Todas as rotas (exceto login) protegidas por token JWT

## Frontend

Funcionalidades implementadas:

* `[x]` Página de login
* `[x]` Salvar JWT no login
* `[x]` Interceptor de requisições
* `[x]` Redirecionamento via botão de filtro
* `[ ]` Lista de veículos (GET)
* `[ ]` Listagem de veículos
* `[ ]` Filtros
* `[ ]` Botão de reserva

## Instalação

O projeto pode ser executado de duas formas: **Docker** ou **manual**.

### 1. Usando Docker Compose

```bash
git clone <repo-url>
cd <repo>
docker-compose up -d
```

Isso irá subir as duas aplicações (frontend e backend) automaticamente.

### 2. Manualmente

1. Clone o repositório

```bash
git clone <repo-url>
cd <repo>
```

2. Entrar nas pastas das aplicações e instalar dependências

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd ../frontend
npm install
npm run start:dev
```

As aplicações estarão disponíveis em:

* Backend: `http://localhost:3000`
* Frontend: `http://localhost:5173` (ou porta configurada)
