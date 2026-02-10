require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.SWAGGER_TITLE,
      version: process.env.SWAGGER_VERSION,
      description: process.env.SWAGGER_DESCRIPTION,
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL,
      },
    ],
  },

  // 🔥 PENTING: path HARUS literal & relatif ke project root
  apis: ['app.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// 🔎 DEBUG (WAJIB ADA SEKALI)
console.log(
  'Swagger paths:',
  swaggerSpec.paths ? Object.keys(swaggerSpec.paths) : 'NONE'
);

module.exports = swaggerSpec;
