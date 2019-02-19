import express from 'express';
// graphql, nos va permitir conectar graphql con express
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const app = express();
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: async({req}) => {
        // obtener el token del servidor, o lo que has enviado del cliente hacia el servidor
        const token = req.headers['authorization'];
        //console.log(token)
        if(token !== "null"){
            try{
                // Verificar el token del front end (cliente)
                // se usa await para que el codigo se ejecute de forma asincrona
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);
                //console.log(usuarioActual)
                // Agregamos el usuario actual al request
                req.usuarioActual = usuarioActual;

                return {
                    usuarioActual
                }
            }catch(err){
                console.error(err);
            }
        }
    } });

server.applyMiddleware({app});

app.listen({port: 4000}, () => 
console.log(`El servidor esta corriendo http://localhost:40000${server.graphqlPath}`));
