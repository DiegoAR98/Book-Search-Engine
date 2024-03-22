const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');

// Import your typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // You will use this middleware to handle user authentication in GraphQL
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Serve the Apollo Server on the same path as the Express server
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer(typeDefs, resolvers);
