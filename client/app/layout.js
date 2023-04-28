import { ClerkProvider } from "@clerk/nextjs/app-beta"
import { deDe } from "@clerk/localizations"

import "@/styles/globals.css"
import "../public/wiener-melange/assets/css/critical.min.css"
import "../public/wiener-melange/assets/css/main.min.css"
import "../public/wiener-melange/assets/css/main.scss"
import "../public/wiener-melange/assets/css/base.min.css"
import "../public/wiener-melange/assets/css/base-tokens.min.css"
import "../public/wiener-melange/assets/css/wiener-melange.min.css"

import Header from "./components/Header/Header"

export const metadata = {
  title: "Home",
  description: "Welcome to Berichte Upload.",
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      {/* <ClerkProvider> */}
      <body>
        {/* <Header /> */}
        {children}
      </body>
      {/* </ClerkProvider> */}
    </html>
  )
}
