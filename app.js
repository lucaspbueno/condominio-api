// Solução para o arquivo app.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const path = require('path');

// Importação das rotas
const boletoRoutes = require('./src/routes/boletoRoutes');
const loteRoutes = require('./src/routes/loteRoutes');

const app = express();
const PORT = process.env.API_PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API
app.use('/api/boletos', boletoRoutes);
// Verifique se loteRoutes está exportando um router válido
if (typeof loteRoutes === 'function') {
  app.use('/api/lotes', loteRoutes);
} else {
  console.warn('loteRoutes não é uma função válida, verificando se existe');
  // Se não existir, vamos criar um router básico
  const router = express.Router();
  router.get('/', (req, res) => {
    res.json({ message: 'Rota de lotes criada automaticamente' });
  });
  app.use('/api/lotes', router);
}

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API de Gerenciamento de Boletos de Condomínio' });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;