import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import mongoose from 'mongoose';
import TodolistSchema from './Schemas/TodolistSchema';

export function setupRoutes(app) {
  const APP_DIR = `${__dirname}/App`;
  const features = fs.readdirSync(APP_DIR).filter(
    file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
  );

  features.forEach(feature => {
    const router = express.Router();
    const routes = require(`${APP_DIR}/${feature}/routes.js`);

    routes.setup(router);
    app.use(`/${feature}`, router);
  });
}

export default class Server {
  setup() {
    const app = express();
    const PORT = process.env.PORT || 3001;
    const DATABASE_NAME = process.env.DATABASE_NAME || 'localhost';

    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${DATABASE_NAME}/Todolist`);
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
  
    setupRoutes(app);

    app.listen(PORT, () => console.log(`Start on http://localhost:${PORT}`));
  }
}
