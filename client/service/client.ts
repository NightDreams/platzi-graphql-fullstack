import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { retrieveToken } from '@service/auth'
import { symbolName } from 'typescript'
import { baseUrl } from './config'

/* now > incluir headers
  1 createHttpLink - crear un const 
  - envoler la url . 
  - + 
  2 setContext >
  - run cualquier funcion que queramos
  - async, puede serlo.
  - 
  -  control auth. Ejecutable de forma dinamica.
--- 
  1 arg "_" no nos importa 
  2 nuevo contexto a darle a  apollo. 
   - headers > determinar auth 
  
  Apollo maneja lso enlaces a los servidores con  "link"
--- 
3 Setup auth 
 - aut > set header Bearer token
 - !auth > null - sin cambios
 - server/ cliente (next)- comportamietno.
--- 
 a - retrieveToken -  get token from sesion . saber si esta autenticado
 b - run only en client> comprobanod - window existe 
 El codigo corre en server y cliente 
*/
const apiLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
})

const authLInk = setContext(async (_, { headers }) => {
  let extraHeaders = {}

  if (typeof window !== 'undefined') {
    // run only in client
    const token = await retrieveToken()
    extraHeaders = {
      Authorization: `Bearer ${token}`,
    }
  }

  return {
    headers: {
      ...headers,
      ...extraHeaders,
    },
  }
})

const client = new ApolloClient({
  // cambiamos "uri" por un lin. 2 links juntos. auth + http link
  link: authLInk.concat(apiLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          avo: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Avocado',
                id: args?.id,
              })
            },
          },
        },
      },
    },
  }),
})

export default client
