import '@/styles/globals.scss'
import Layout from '@/components/Layout'
import { Provider } from 'react-redux';
import store from '../store/index'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </Provider>)
}
