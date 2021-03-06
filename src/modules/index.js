import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './users/index.js'
import PermissionModule from "./permissions/index.js"
import TypeModule from './types/index.js'
import BranchModule from './branches/index.js'
import TransportModule from './transports/index.js'

export default makeExecutableSchema({
    typeDefs: [
        TypeModule.typeDefs,
        UserModule.typeDefs,
        PermissionModule.typeDefs,
        BranchModule.typeDefs,
        TransportModule.typeDefs
    ],
    resolvers: [
        TypeModule.resolvers,
        UserModule.resolvers,
        PermissionModule.resolvers,
        BranchModule.resolvers,
        TransportModule.resolvers
    ]
})