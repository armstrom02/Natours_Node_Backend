const express = require('express');

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

if (process.env.NODE_ENV === 'development ') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour!'
});

app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.reqestTime = new Date().toISOString();
  next();
});

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Handling unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server'`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
