const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/error.middleware');

const authRouter = require('./routes/auth.routes');
const propertyRouter = require('./routes/property.routes');
const analysisRouter = require('./routes/analysis.routes');
const { swaggerUi, specs } = require('./config/swagger');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Implement CORS
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
// Body parser, reading data from body into req.body
app.use(express.json());

// Serving static files
app.use(express.static('public'));

// 2) ROUTES
app.use('/api/v1/users', authRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/analysis', analysisRouter);

// Check health
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
  });
});

// 3) UNHANDLED ROUTES
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
