const express = require('express');
const cors = require('cors');
const path = require('path');
const boletoRoutes = require('./src/routes/boletoRoutes');
const swagger = require('./src/config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Documentação da API com Swagger
app.use('/api-docs', swagger.serve, swagger.setup);

// Rotas
app.use('/api/boletos', boletoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de importação de boletos funcionando!');
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ocorreu um erro no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação da API disponível em http://localhost:${PORT}/api-docs`);
});

module.exports = app;