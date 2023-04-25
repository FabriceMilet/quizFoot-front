import '@/styles/globals.scss'
import '@/styles/reset.scss'
import Layout from '@/components/Layout'
// import { useFetchUser } from '@/lib/authContext';


export default function App({ Component, pageProps }) {

  return (
      <Layout >
        <Component {...pageProps} />
      </Layout>
    )
}
