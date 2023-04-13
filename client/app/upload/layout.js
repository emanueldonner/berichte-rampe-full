import Navbar from "../components/Navbar/Navbar"

import styles from "../components/Layout/Layout.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles["layout"]}>
      <div className={styles["main-container"]}>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  )
}
