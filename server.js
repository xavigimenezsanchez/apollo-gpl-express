// https://www.youtube.com/watch?v=xUQ-hNRHCgs
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use((req, res) => {
    res.send("helloooo from apollo server");
  });

  await mongoose.connect("mongodb://localhost:27017/post_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Mongoose connected...");
  app.listen(4000, () => console.log("Server is running on Port 4000"));
}

startServer();
