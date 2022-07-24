import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../service/client'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'
import CartProvider from '@store/Cart'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  )
}

export default MyApp
