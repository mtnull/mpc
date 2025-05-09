import Fastify from "fastify";
import mercurius from "mercurius";
import { ExecutionResult, GraphQLError } from "graphql";
import { CONFIG } from "./config/server";
import { SCHEMA } from "./schemas/schema";
import { resolvers } from "./resolvers/resolvers";

// Setup custom error handling to make error messages clear for customers.
type CustomError = {
  statusCode: number,
  response: {
    errors: { message: string }[]
  }
};

// Creates string of error messages to send with the Internal Server Error status code. 
const custom_error = (result: ExecutionResult): CustomError => {
  const messages = result.errors?.map((err: GraphQLError): { message: string } => (
    { message: err.message }
  )) ?? [{ message: "Unknown error" }];

  return {
    statusCode: 500,
    response: {
      errors: messages
    }
  }
};

const app = Fastify({
  logger: true
});

app.register(mercurius, {
  schema: SCHEMA,
  resolvers: resolvers,
  errorFormatter: custom_error,
  graphiql: true
});

app.listen({ port: CONFIG.port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server running at ${address}`);
});
