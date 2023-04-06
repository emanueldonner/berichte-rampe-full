import { ClerkProvider } from "@clerk/nextjs"
import { deDE } from "@clerk/localizations"
import Layout from "@/components/Layout/index"
import "@/styles/globals.css"
import "../assets/css/critical.min.css"
import "../assets/css/main.min.css"

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} localization={deDE}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}
