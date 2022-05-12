import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './users/index.js'
import PermissionModule from "./permissions/index.js"
import TypeModule from './types/index.js'

export default makeExecutableSchema({
    typeDefs: [
        TypeModule.typeDefs,
        UserModule.typeDefs,
        PermissionModule.typeDefs
    ],
    resolvers: [
        TypeModule.resolvers,
        UserModule.resolvers,
        PermissionModule.resolvers
    ]
})