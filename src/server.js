import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import '#config/index'
import jwt from 'jsonwebtoken'
import schema from './modules/index.js'
import {secret_key} from '#config/index'
!async function () {
    const app = express()
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        schema,
        context: ({req}) => {
            const userAgent = req.get("user-agent")
            const token = req.get('token')
            let isAuth = false
            let token_obj = {}
            
            if(token){
                try {
                    token_obj = jwt.verify(token,secret_key)
                    if(token_obj.userAgent=userAgent){
                    isAuth=true
                    }
                } catch (e) {
                    isAuth = false
                }
            }
            return {token_obj,userAgent,isAuth}
        },

        csrfPrevention: true,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    })

    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT}, resolve))
    console.log(`🚀 Server ready at http://localhost:${process.env.port+server.graphqlPath}`)
}()