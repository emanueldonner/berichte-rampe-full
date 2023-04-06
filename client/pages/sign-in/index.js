import { SignIn } from "@clerk/nextjs"
import { deDE } from "@clerk/localizations"

import styles from "./sign-in.module.sass"

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
