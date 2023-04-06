import Header from "../Header"
import Navbar from "../Navbar"

import styles from "./layout.module.sass"

export default function Layout({ children }) {
  return (
    <div className={styles["layout"]}>
      <Header />
      <div className={styles["main-container"]}>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  )
}
