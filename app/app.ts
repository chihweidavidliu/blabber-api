// lib/app.ts
import express from 'express';
import router from './router';
import mongoose from 'mongoose';
//config
import config from './config/config.json';
const env = process.env.NODE_ENV || 'development'; // set the environment
import { IEnvConfig } from './interfaces';

if (env === 'development' || env === 'test') {
  const envConfig: IEnvConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    // turn the envConfig object into an array of key names
    process.env[key] = envConfig[key]; // for each key, set process.env[key] to the value of that key (taken from envConfig object)
  });
}

// Create a new express application instance
const app: express.Application = express();

router(app);

// Database
mongoose.Promise = global.Promise;
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .catch((err: Error) => console.log('There was an error', err));

export const server = app.listen(process.env.PORT, function() {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  console.log(`Connected to database ${process.env.MONGODB_URI}`);
});

export default app;
