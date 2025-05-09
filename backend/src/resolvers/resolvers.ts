import { IResolvers } from "mercurius";
import { calculate_prequalification } from "./fields/prequalification";

export const resolvers: IResolvers = {
  Query: {
    calculate_prequalification,
  }
};
