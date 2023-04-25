import '@/styles/globals.scss'
import '@/styles/reset.scss'
import Layout from '@/components/Layout'
import { useFetchUser } from '@/lib/authContext';


export default function App({ Component, pageProps }) {
  const { user, loading } = useFetchUser();
  return (
      <Layout user={user} >
        <Component {...pageProps} />
      </Layout>
    )
}
