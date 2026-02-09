const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/error.middleware');

const authRouter = require('./routes/auth.routes');
const propertyRouter = require('./routes/property.routes');
const analysisRouter = require('./routes/analysis.routes');
const portfolioRouter = require('./routes/portfolio.routes');
const reportRouter = require('./routes/report.routes');
const { swaggerUi, specs } = require('./config/swagger');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Rate limiting to prevent brute-force attacks
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

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
app.use('/api/v1/portfolios', portfolioRouter);
app.use('/api/v1/reports', reportRouter);

// Root route - API Welcome
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to PropAnalyze API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/users',
      properties: '/api/v1/properties',
      analysis: '/api/v1/analysis',
      portfolios: '/api/v1/portfolios',
      reports: '/api/v1/reports'
    }
  });
});

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
