import { IResolvers } from '@graphql-tools/utils';


export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return [{ id: 1, title: "Fahrrad" }]
    }
  },

  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      return { id: id, title: "fahrrad", price: 99, image: "url" }
    }
  }
}