"use client"

import React from "react"
import styles from "./Header.module.css"
import { createComponent } from "@lit-labs/react"
// import { Header as HeaderWC } from "../melange/components/Header/Header"
import "../../../public/wiener-melange/assets/js/components/NavMain/NavMain"
import "../../../public/wiener-melange/assets/js/components/Header/Header"
import "../../../public/wiener-melange/assets/js/components/Quicklinks/Quicklinks"
import "../../../public/wiener-melange/assets/js/components/CTA/CTA"
// const Header = createComponent({
//   react: React,
//   tagName: "wc-header",
//   elementClass: HeaderWC,
// })
// const NavMain = createComponent({
//   react: React,
//   tagName: "wc-nav-main",
//   elementClass: NavMainWC,
// })

const HeaderComponent = () => {
  return (
    <div>
      <section>
        <wm-header>
          <wm-nav-main>
            <ul>
              <li>
                <a href="#">Startseite</a>
              </li>
              <li>
                <a href="#">Über uns</a>
              </li>
            </ul>
          </wm-nav-main>
        </wm-header>
        <h2>Standard</h2>
        <wm-quicklinks>
          <ul>
            <li>
              <wm-cta>
                <a href="#">Aktuelle Kennzahlen (20. November 2022)</a>
              </wm-cta>
            </li>
            <li>
              <wm-cta>
                <a href="#">
                  Tests in Schnupfen-Checkboxen (27. September 2022)
                </a>
              </wm-cta>
            </li>
            <li>
              <wm-cta>
                <a href="#">
                  Mit größtmöglicher Sicherheit in den Schulstart (3. September
                  2022)
                </a>
              </wm-cta>
            </li>
          </ul>
        </wm-quicklinks>
      </section>
    </div>
  )
}

export default HeaderComponent
