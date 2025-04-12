# Sistema de Gerenciamento de Boletos de Condomínio

<div align="center">
  <div style="display: flex; align-items: center;">
    <h3>Status:&nbsp;</h3>
    <h3><span style="background-color: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px;">EM DESENVOLVIMENTO</span></h3>
  </div>
</div>

## 🛠️ Tecnologias Utilizadas

<div style="display: flex; gap: 10px;">
  <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
  <img src="https://img.shields.io/badge/-Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
</div>

## 📋 Sobre

Este projeto implementa uma API para gerenciar boletos de condomínio, permitindo a importação de arquivos CSV e PDF, além da geração de relatórios em PDF.

Foi desenvolvido como solução para o desafio técnico da Green Acesso, implementando um sistema para importação, processamento e exportação de boletos entre diferentes sistemas de condomínio.

## ✨ Funcionalidades

- Importação de boletos a partir de arquivos CSV.
- Processamento de arquivos PDF de boletos (dividindo-os em PDFs individuais).
- Listagem de boletos com diversos filtros (nome, valor, lote).
- Geração de relatórios em PDF.
- Documentação interativa com Swagger.

## 🚀 Como Usar

### Pré-requisitos

- Node.js (versão 16 ou superior).
- Docker e Docker Compose (opcional, para execução em contêiner).
- PostgreSQL configurado.

### Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/condominio-project.git
   cd condominio-project
   ```

2. Configure as variáveis de ambiente no arquivo `.env`:
   ```plaintext
   DB_USER=user
   DB_PASS=password
   DB_NAME=condominio-db
   DB_HOST=db
   API_PORT=3000
   NODE_ENV=development
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npm run migrate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

6. Acesse a API em `http://localhost:3000`.

### Usando Docker

1. Configure o arquivo `.env` conforme o exemplo acima.
2. Execute o comando:
   ```bash
   docker-compose up --build
   ```
3. Acesse a API em `http://localhost:3000`.

## 📚 Rotas

### Boletos

- **GET /api/boletos**  
  Lista todos os boletos com filtros opcionais:
  - `nome`: Filtra pelo nome do sacado.
  - `valor_inicial`: Filtra pelo valor mínimo.
  - `valor_final`: Filtra pelo valor máximo.
  - `id_lote`: Filtra pelo ID do lote.
  - `relatorio`: Gera um relatório em PDF (1 = sim).

- **POST /api/boletos/import/csv**  
  Importa boletos de um arquivo CSV.  
  **Body (multipart/form-data):**
  - `file`: Arquivo CSV.

- **POST /api/boletos/import/pdf**  
  Processa boletos de um arquivo PDF, gerando arquivos individuais.  
  **Body (multipart/form-data):**
  - `file`: Arquivo PDF.

### Lotes

- **GET /api/lotes**  
  Lista todos os lotes.

- **GET /api/lotes/{id}**  
  Retorna os detalhes de um lote específico.

- **POST /api/lotes**  
  Cria um novo lote.  
  **Body (JSON):**
  ```json
  {
    "nome": "0017",
    "ativo": true
  }
  ```

## 📖 Documentação

A documentação interativa da API está disponível em:  
[Swagger UI](http://localhost:3000/api-docs)

## 🏛️ Estrutura do Projeto

```plaintext
condominio-project/
├── src/
│   ├── config/          # Configurações (Swagger, banco de dados, etc.)
│   ├── controllers/     # Controladores das rotas
│   ├── middlewares/     # Middlewares (ex.: upload de arquivos)
│   ├── models/          # Modelos do banco de dados (Sequelize)
│   ├── routes/          # Rotas da API
│   ├── utils/           # Utilitários (ex.: processamento de arquivos)
├── uploads/             # Arquivos enviados
├── .env                 # Variáveis de ambiente
├── .env.sample          # Arquivo de exemplo para o arquivo .env
├── docker-compose.yaml  # Configuração do Docker Compose
├── Dockerfile           # Configuração do Dockerfile
├── .dockerignore        # Sinaliza quais arquivos devem ser ignorados pelo docker
├── .gitignore           # Sinaliza quais arquivos devem ser ignorados pelo git
└── README.md            # Documentação do projeto
```

## 🧪 Testes

Atualmente, o projeto não possui testes automatizados. Planejamos adicionar testes em breve.

## 📬 Contato

- **Autor:** Lucas Parreiras  
- **Email:** lucaspbueno22@gmail.com
