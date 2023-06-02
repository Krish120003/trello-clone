import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "database";
import { readFileSync } from "fs";
const typeDefs = readFileSync("src/schema.graphql", { encoding: "utf-8" });
const resolvers = {
    Query: {
        boards: async (_, __, context) => {
            const data = await context.prisma.board.findMany({
                include: {
                    lists: {
                        include: { cards: true },
                    },
                },
            });
            return data;
        },
    },
    Mutation: {
        createBoard: async (parent, { title }, context, info) => {
            console.log("createBoard");
            console.log(title);
            // console.log(context);
            return null;
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
        console.log(req);
        return { prisma: prisma };
    },
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
