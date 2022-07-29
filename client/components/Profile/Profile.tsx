import { Segment, Header, Button } from 'semantic-ui-react'
import { removeToken } from '@service/auth'
import type { User } from '@service/auth'

import Layout from '@components/Layout/Layout'
/* 
  1 import document 
  2 imp - request framework > tratar con el document 
  3 setup mutation 
  4 setup  event to run  mutation
  5 -setup auth > client 
 */
import { AddAvocadoDocument } from '@service/graphql'
import { useMutation } from '@apollo/client'

function Profile({ user }: { user: User }) {
  /* 
  useMutation
   trigiger , {data , loading  }
  -- 
  addAvocado 
  --
  */

  const [addAvocado, { data, loading }] = useMutation(AddAvocadoDocument)
  console.log(
    '🚀 ~ file: Profile.tsx ~ line 20 ~ Profile ~ data, loading',
    data,
    loading
  )

  // 4 mutate props
  /* arg -  variables:{} - receibe values with gon to run mutation  
  variables - las mismas que espera el schema, inside "data"
como nuestro query in "queries.graphql"
  */
  const createAvo = async () => {
    addAvocado({
      variables: {
        data: {
          name: 'Zutano Avocado 2 ',
          sku: 'MW79ZZEWV6Y',
          price: 1.42,
          image: 'static/zutano.jpg',
          description:
            'The zutano avocado is a cold hardy, consistent producing avocado variety. ',
          shape: 'Pear',
          hardiness: '-5ºC',
          taste: 'Splendid, is an avocado',
        },
      },
    })
  }
  const logout = async () => {
    await removeToken()
    window.location.reload()
  }

  return (
    <Layout title="Hola">
      <div className="mt-14" />
      <Header as="h2" size="huge" className="">
        Hola, {user.username}
      </Header>
      <Segment>
        <p>
          Si estás viendo esto es porque has iniciado sesión de forma correcta.
        </p>
        <Button type="button" positive onclick={createAvo}>
          Agregar nuevo avocado...
        </Button>{' '}
        <Button type="button" basic color="red" onClick={logout}>
          Logout
        </Button>
      </Segment>
      <div className="mb-20" />
    </Layout>
  )
}

export default Profile
