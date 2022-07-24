import { useState } from 'react'
import Layout from '@components/Layout/Layout'
import { Card } from 'semantic-ui-react'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import { GetAllAvocadosDocument, Avocado } from '../service/graphql'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import client from '../service/client'
export const getStaticProps: GetStaticProps<{ products: Avocado[] }> =
  async () => {
    try {
      const response = await client.query({
        query: GetAllAvocadosDocument,
      })

      if (response.data.avos == null) {
        throw new Error('Failed to request')
      }
      // as Avocado[] > was indifferent here
      const products = response.data.avos as Avocado[]
      return {
        props: {
          products,
        },
      }
    } catch (error) {
      console.log(error)
      return {
        props: [],
      }
    }
  }

const HomePage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isEnabled, setIsEnabled] = useState(false)

  console.log({ products })

  return (
    <Layout title="Home">
      <KawaiiHeader />
      <Card.Group itemsPerRow={2} centered>
        {documentationList.map((doc) => (
          <Card
            key={doc.link}
            href={doc.link}
            header={doc.title}
            meta={doc.meta}
            description={doc.description}
          />
        ))}
      </Card.Group>
    </Layout>
  )
}

const documentationList = [
  {
    title: 'Documentación Proyecto',
    meta: 'Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-graphql-fullstack',
  },
  {
    title: 'Documentación Next.js',
    meta: 'Documentación',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación GraphQL',
    meta: 'Documentación',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://graphql.org/learn/',
  },
  {
    title: 'Curso de GraphQL con Node.js',
    meta: 'Proyecto',
    description:
      'Revisa el curso en donde creamos todo el backend y la API para este proyecto.',
    link: 'https://platzi.com/cursos/graphql-nodejs/',
  },
]

export default HomePage
