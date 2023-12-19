import express from 'express';
import { config } from './configs';
import { addTimestamp, logger } from './middlewares'
import { feedRouter } from './routes';
import { errorHandler } from './middlewares/error';

const app = express();
const port = config.port || 8080;

// middleware
app.use(addTimestamp);
app.use(logger);

// routes
app.use('/feed', feedRouter);

// handle errors
app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: ", err.message);
  console.log("Closing server now...");
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Closing server now...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });
});