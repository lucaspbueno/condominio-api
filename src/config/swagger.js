const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opções de configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Boletos de Condomínio',
      version: '1.0.0',
      description: 'API para importar e gerenciar boletos de condomínio',
      contact: {
        name: 'Lucas Parreiras',
        email: 'lucaspbueno22@gmail.com'
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.API_PORT || 3000}`,
        description: 'Servidor de desenvolvimento'
      },
    ],
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js'
  ],
};

// Gerar especificação Swagger
const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs)
};