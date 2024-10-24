const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voting System",
      version: "1.0.0",
    },
  },
  apis: ["../src/routes*.js"],
};

export const openApiSpecification = swaggerJsdoc(options);
