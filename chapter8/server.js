const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static('public'));

const mySchema = require('./schema/main');

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');

  app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    context: { db },
    graphiql: true
  }));

  app.listen(process.env.PORT, () =>
    console.log(`Running Express.js on port ${process.env.PORT}`)
  );
});
