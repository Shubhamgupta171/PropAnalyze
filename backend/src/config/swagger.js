const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PropAnalyze API Documentation',
      version: '1.0.0',
      description: 'API Documentation for the PropAnalyze Real Estate Underwriting Plateform',
      contact: {
        name: 'Backend Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:5001/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['user', 'agent', 'admin'] },
            photo: { type: 'string', description: 'Cloudinary URL' },
          },
        },
        Property: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'string' },
            images: { type: 'array', items: { type: 'string' } },
            beds: { type: 'integer' },
            baths: { type: 'number' },
            sqft: { type: 'number' },
            location: {
              type: 'object',
              properties: {
                address: { type: 'string' },
                coordinates: { type: 'array', items: { type: 'number' } },
              },
            },
            asset_class: { type: 'string' },
            agent_id: { type: 'string', format: 'uuid' },
            latest_cap_rate: { type: 'number' },
            latest_coc: { type: 'number' },
          },
        },
        Analysis: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            property_id: { type: 'string', format: 'uuid' },
            strategy: { type: 'string' },
            metrics: {
              type: 'object',
              properties: {
                noi: { type: 'number' },
                capRate: { type: 'number' },
                cashOnCash: { type: 'number' },
                annualGrossRent: { type: 'number' },
                operatingExpenses: { type: 'number' },
                monthlyMortgage: { type: 'number' },
                monthlyCashFlow: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
