import userTypeDefs from "./user/typeDefs.js";
import userResolver from "./user/resolvers.js";

const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [baseTypeDefs, userTypeDefs];
const resolvers = [userResolver];

export { typeDefs, resolvers };
