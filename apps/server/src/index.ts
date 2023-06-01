import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

type Card {
  title: String
}

type List {
  title: String
  cards: [Card]
}

type Board {
  title: String
  lists: [List]
}

type Query {
 boards: [Board]
}
`;

const resolvers = {};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
