import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: [Author]
  }

  type Author {
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: ["Kate Chopin"],
  },
  {
    title: "City of Glass",
    author: ["Paul Auster"],
  },
  {
    title: "The Blazing World",
    author: ["Siri Hustvedt", "Paul Auster"],
  },
];

const authors = [
  {
    name: "Kate Chopin",
    books: ["The Awakening"],
  },
  {
    name: "Paul Auster",
    books: ["City of Glass", "The Blazing World"],
  },
  {
    name: "Siri Hustvedt",
    books: ["The Blazing World"],
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Book: {
    author: (parent: any) => {
      console.log("Parent", parent);
      return parent.author.map((author: string) =>
        authors.find((a) => a.name === author)
      );
    },
  },
  Author: {
    books: (parent: any) => {
      return books.filter((book) => book.author.includes(parent.name));
    },
  },
  Query: {
    books: () => books,
    authors: () => authors,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
