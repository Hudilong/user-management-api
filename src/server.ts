import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { resolvers, typeDefs } from "./graphql/schema.js";
import { initializeSchema } from "./models/scripts/createTables.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import accountRouter from "./routes/accountRouter.js";
import helmet from "helmet";
import { timeout } from "./middlewares/timeout.js";
import { limiter, sensitiveLimiter } from "./middlewares/limiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT;

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

await initializeSchema();

app.use(cors());
app.use(helmet());
app.use(timeout(10));
app.use(express.json());

// Use Apollo Server for GraphQL
app.use("/graphql", expressMiddleware(server));

// RESTful API Routes
app.use("/auth", sensitiveLimiter, authRouter);
app.use("/users", limiter, userRouter);
app.use("/me", limiter, accountRouter);

//Error handling
app.use(errorHandler);

await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
