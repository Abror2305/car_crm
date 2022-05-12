import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './users/index.js'

export default makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
    ],
    resolvers: [
        UserModule.resolvers,
    ]
})