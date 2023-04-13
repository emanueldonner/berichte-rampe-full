import { SignIn } from "@clerk/nextjs/app-beta"
import { deDE } from "@clerk/localizations"

import styles from "./sign-in.module.css"

const SignInPage = () => (
  <div className={styles["sign-in-page"]}>
    <SignIn
      className={styles["sign-in"]}
      path="/sign-in"
      afterSignInUrl="/"
      appearance={{
        variables: {
          fontSize: "1.5rem",
        },
      }}
      localization={deDE}
    />
  </div>
)

export default SignInPage
