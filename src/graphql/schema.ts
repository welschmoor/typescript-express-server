import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

// look at files which end in typeDefs.js
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
export const typeDefs = mergeTypeDefs(loadedTypes)

// look at files which end in either queires or mutations.js in all folders:
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations,resolvers}.ts`)
export const resolvers = mergeResolvers(loadedResolvers)

