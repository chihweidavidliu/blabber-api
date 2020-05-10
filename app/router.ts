import express = require('express');
import User from './models/User';

const router = (app: express.Application): void => {
  app.get('/', function(req, res) {
    res.send('Home!');
  });
  app.get('/hello', function(req, res) {
    res.send('Hello World!');
  });

  app.post('/user', async (req, res) => {
    const { email, firstName, lastName } = req.query;
    const newUser = await new User({
      email,
      firstName,
      lastName,
    })
      .save()
      .catch((e: Error) => res.status(500).send(e.message));

    res.send(newUser);
  });
};

export default router;
