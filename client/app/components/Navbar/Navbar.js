"use client"

import "../melange/components/CTA/CTA"
// import "../melange/components/CTA/styles/cta.styles"
// import "../melange/components/CTA/styles/cta.melange.tokens.css"

import "../melange/components/NavMain/NavMain"

import styles from "./Navbar.module.css"

// export const CTAComponent = createComponent({
//   tagName: "wm-cta",
//   elementClass: CTA,
//   react: React,
// })

const Navbar = () => {
  return (
    <div className={styles["navbar"]}>
      {/* <wm-nav-main slot="nav"> */}
      <ul>
        <li>
          <span className="wm-cta">
            <button>Details</button>
          </span>
        </li>
        <li>
          <wm-cta full="true">hallo</wm-cta>
        </li>
        <li></li>
      </ul>
      {/* </wm-nav-main> */}
    </div>
  )
}

export default Navbar
