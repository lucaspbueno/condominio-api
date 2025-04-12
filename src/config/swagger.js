const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Boletos de Condomínio',
      version: '1.0.0',
      description: 'API para importar, processar e listar boletos de condomínio',
      contact: {
        name: 'Lucas Parreiras',
        email: 'lucaspbueno22@gmail.com'
      },
    },
    servers: [
      {
        url: '/api',
        description: 'API do servidor'
      }
    ],
    components: {
      responses: {
        Error: {
          description: 'Erro na requisição',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Boletos',
        description: 'Operações relacionadas a boletos'
      },
      {
        name: 'Lotes',
        description: 'Operações relacionadas a lotes'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;