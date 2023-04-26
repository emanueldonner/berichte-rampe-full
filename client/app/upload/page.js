"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import useWebSocket from "react-use-websocket"

import { logMsgs } from "../../assets/logMsgs"

function ReportSettingsForm({ path, filename, onParseClick }) {
  const [siteLang, setSiteLang] = useState("de")
  const [siteTitle, setSiteTitle] = useState("")
  const [siteDescription, setSiteDescription] = useState("")
  const [siteColor, setSiteColor] = useState("abendstimmung")
  const [headerMenu, setHeaderMenu] = useState(false)
  const [siteSearch, setSiteSearch] = useState(true)
  const [skipFirstChapter, setSkipFirstChapter] = useState(true)
  const [stageTitle, setStageTitle] = useState("")
  const [stageDescription, setStageDescription] = useState("")
  const [sitePath, setSitePath] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Validate form whenever any state value changes
    const isValidForm = () => {
      if (!siteTitle.trim() || !siteDescription.trim() || !stageTitle.trim()) {
        setIsValid(false)
        return
      }

      setIsValid(true)
    }

    isValidForm()
  }, [siteTitle, siteDescription, stageTitle])

  const handleSubmit = (event) => {
    event.preventDefault()
    const reportSettings = {
      site_lang: siteLang,
      site_title: siteTitle,
      site_description: siteDescription,
      site_color: siteColor,
      header_menu: headerMenu,
      site_search: siteSearch,
      skip_first_chapter: skipFirstChapter,
      stage_title: stageTitle,
      stage_description: stageDescription,
      site_path: sitePath,
      path: path,
      filename: filename,
    }
    console.log("reportSettings: ", reportSettings)
    onParseClick(reportSettings)

    // axios
    //   .post("/api/report-settings", reportSettings)
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  return (
    <form
      className="wm-form"
      id="form"
      style={{ scrollMarginTop: "12rem" }}
      onSubmit={handleSubmit}
    >
      <fieldset>
        <legend className="wm-h3">Einstellungen für Berichte-Seite</legend>
        <div className="wm-form">
          <div>
            <fieldset>
              <legend>Seitensprache:</legend>
              <input
                type="radio"
                name="site_lang"
                id="site_lang_de"
                value="de"
                checked={siteLang === "de"}
                className="wm-h-vh"
                onChange={(event) => setSiteLang(event.target.value)}
              />
              <label
                className="wm-form-label wm-form-label--radio"
                htmlFor="site_lang_de"
              >
                <span>Deutsch</span>
              </label>
              <input
                type="radio"
                name="site_lang"
                id="site_lang_en"
                value="en"
                checked={siteLang === "en"}
                className="wm-h-vh"
                onChange={(event) => setSiteLang(event.target.value)}
              />
              <label
                className="wm-form-label wm-form-label--radio"
                htmlFor="site_lang_en"
              >
                <span>Englisch</span>
              </label>
            </fieldset>
          </div>
          <div>
            <label className="wm-form-label" htmlFor="site_title">
              <span>
                Titel der Seite:
                <abbr title="Pflichtfeld">*</abbr>
              </span>
            </label>
            <input
              type="text"
              name="site_title"
              id="site_title"
              value={siteTitle}
              required
              onChange={(event) => setSiteTitle(event.target.value)}
            />
          </div>
          <div>
            <label className="wm-form-label" htmlFor="site_description">
              <span>
                SEO Seiten Beschreibung:
                <abbr title="Pflichtfeld">*</abbr>
              </span>
            </label>
            <textarea
              id="site_description"
              rows="6"
              name="site_description"
              required
              value={siteDescription}
              onChange={(event) => setSiteDescription(event.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="wm-form-label" htmlFor="site_color">
              Farbe des Headers:
            </label>
            <select
              name="site_color"
              id="site_color"
              value={siteColor}
              onChange={(event) => setSiteColor(event.target.value)}
            >
              <option value="abendstimmung">Abendstimmung</option>
              <option value="flieder">Flieder</option>
              <option value="frischgruen">Frischgrün</option>
              <option value="goldgelb">Goldgelb</option>
              <option value="morgenrot">Morgenrot</option>
              <option value="nebelgrau">Nebelgrau</option>
              <option value="wasserblau">Wasserblau</option>
            </select>
          </div>
          <div>
            <fieldset>
              <legend>Menüpunkte im Header anzeigen:</legend>
              <input
                type="radio"
                name="header_menu"
                id="header_menu_true"
                value="true"
                checked={headerMenu}
                className="wm-h-vh"
                onChange={() => setHeaderMenu(true)}
              />
              <label
                className="wm-form-label wm-form-label--radio"
                htmlFor="header_menu_true"
              >
                <span>Ja</span>
              </label>
              <input
                type="radio"
                name="header_menu"
                id="header_menu_false"
                value="false"
                checked={!headerMenu}
                className="wm-h-vh"
                onChange={() => setHeaderMenu(false)}
              />
              <label
                className="wm-form-label wm-form-label--radio"
                htmlFor="header_menu_false"
              >
                <span>Nein</span>
              </label>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>Suchfeld im Header anzeigen:</legend>
              <input
                type="radio"
                name="site_search"
                id="site_search_true"
                value="true"
                checked={siteSearch}
                className="wm-h-vh"
                onChange={() => setSiteSearch(true)}
              />
              <label
                className="wm-form-label wm-form-label--radio"
                htmlFor="site_search_true"
              >
                <span>offen</span>
              </label>
              <input
                type="radio"
                name="site_search"
                id="site_search_hidden"
                value="hidden"
                checked={!siteSearch}
                className="wm-h-vh"
                onChange={() => setSiteSearch(false)}
              />
              <label
                className="wm-form-label wm-form-label--radio"
                htmlFor="site_search_hidden"
              >
                <span>versteckt</span>
              </label>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>Nummerierung beginnt ab dem 2. Kapitel:</legend>
              <small>
                Wenn 1. Kapitel Einleitungskapitel, dann beginnt Nummerierung
                erst ab dem 2. Kapitel.
              </small>
              <div className="wm-u-mts">
                <input
                  type="radio"
                  name="skip_first_chapter"
                  id="skip_first_chapter_true"
                  value="true"
                  checked={skipFirstChapter}
                  className="wm-h-vh"
                  onChange={() => setSkipFirstChapter(true)}
                />
                <label
                  className="wm-form-label wm-form-label--radio"
                  htmlFor="skip_first_chapter_true"
                >
                  <span>Ja</span>
                </label>
                <input
                  type="radio"
                  name="skip_first_chapter"
                  id="skip_first_chapter_false"
                  value="false"
                  checked={!skipFirstChapter}
                  className="wm-h-vh"
                  onChange={() => setSkipFirstChapter(false)}
                />
                <label
                  className="wm-form-label wm-form-label--radio"
                  htmlFor="skip_first_chapter_false"
                >
                  <span>Nein</span>
                </label>
              </div>
            </fieldset>
          </div>
          <div>
            <label className="wm-form-label" htmlFor="stage_title">
              Stage Titel:<abbr title="Pflichtfeld">*</abbr>
            </label>
            <input
              type="text"
              name="stage_title"
              id="stage_title"
              value={stageTitle}
              required
              onChange={(event) => setStageTitle(event.target.value)}
            />
          </div>
          <div>
            <label className="wm-form-label" htmlFor="stage_description">
              Stage Untertitel:
            </label>
            <input
              type="text"
              name="stage_description"
              id="stage_description"
              value={stageDescription}
              onChange={(event) => setStageDescription(event.target.value)}
            />
          </div>
          <div>
            <label className="wm-form-label" htmlFor="site_path">
              Pfad der Seite:
            </label>
            <input
              value={sitePath}
              type="text"
              name="site_path"
              id="site_path"
              placeholder="z. B. /spezial/namedesberichts"
              onChange={(event) => setSitePath(event.target.value)}
            />
          </div>
        </div>
      </fieldset>
      <div className="wm-form__grid-md">
        <div className="wm-u-mtm">
          <button
            className="js-generate wm-btn--block"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Bericht generieren
          </button>
        </div>
      </div>
    </form>
  )
}

function UploadPage() {
  const [socketUrl, setSocketUrl] = useState(null)
  const [message, setMessage] = useState(new Array())
  const [path, setPath] = useState("")
  const [filename, setFilename] = useState("")
  const [success, setSuccess] = useState(false)
  const [readyForZip, setReadyForZip] = useState(false)
  const [zipFilePath, setZipFilePath] = useState("")
  const [zipDownloadUrl, setZipDownloadUrl] = useState("")
  const [logStatus, setLogStatus] = useState("")
  const scroller = useRef(null)
  const addToMessage = (msg) => {
    setMessage((prev) => [...prev, msg])
  }

  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight
    }
  }, [message])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSocketUrl(`ws://${window.location.hostname}:5000/log`)
    }
  }, [])

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      // console.log("WebSocket message:", JSON.parse(event.data))
      console.log("message incoming")
      const data = JSON.parse(event.data)
      const e = data.event
      // data.map((msg) => {
      //   setMessage((prev) => prev + msg)
      // })
      if (e == "parselog") {
        const { body } = data
        let header = ""
        let content = ""
        logMsgs.map((msg) => {
          if (msg.ref === body.ref) {
            header = msg.message
            content = msg.explanation
            console.log("found match", header)
          } else {
            console.log("no match")
          }
        })
        const msg = `${body.level}: ${header} | ${content}`
        addToMessage(msg)
      } else {
        console.log("fire if event !== 'parselog'")
        addToMessage(data.msg ?? data.message ?? data)
      }
    },
    onError: (error) => {
      console.log("WebSocket error:", error)
    },
    onOpen: () => {
      console.log("WebSocket connected")
      sendJsonMessage({ message: "Hello from client" })
    },
  })

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles)
    try {
      setLogStatus("loading")
      const formData = new FormData()
      formData.append("file", acceptedFiles[0])

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      addToMessage(res.data.message)
      res.data.status === "success" && setSuccess(true)
      setPath(res.data.path)
      setFilename(res.data.filename)
      setLogStatus("")
    } catch (error) {
      addToMessage(error)
    }
  }, [])

  const onParseClick = async (data) => {
    try {
      setLogStatus("loading")
      const res = await axios.post("/api/parse", {
        ...data,
      })

      addToMessage(res.data.message)
      res.data.status === "success" && setReadyForZip(true)
      setZipFilePath(res.data.path)
      setLogStatus("")
    } catch (error) {
      addToMessage(error)
    }
  }

  const handleZip = async () => {
    try {
      setLogStatus("loading")
      const res = await axios.post("/api/compress", {
        path: zipFilePath,
      })
      addToMessage(res.data.message)
      setZipDownloadUrl(res.data.zipUrl)
      setLogStatus("")
    } catch (error) {
      addToMessage(error)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const dropzoneStyle = isDragActive
    ? "dropzone-container dropzone-active"
    : "dropzone-container"
  // const dropzoneStyleString = JSON.stringify(dropzoneStyle)
  return (
    <main>
      <h2>Berichte Upload</h2>
      <div>
        <div>
          <div {...getRootProps()} className={dropzoneStyle}>
            <input id="dropzone" {...getInputProps()} accept=".docx" />
            <label htmlFor="dropzone" className="dropzone-label">
              {isDragActive
                ? "Die Datei hier ablegen ..."
                : "Ziehen Sie eine .docx-Datei hierher, oder klicken Sie, um eine Datei auszuwählen"}
            </label>
          </div>
          {success && (
            <ReportSettingsForm
              path={path}
              filename={filename}
              onParseClick={onParseClick}
            />
          )}
          {readyForZip && (
            <div className="wm-form__grid-md">
              <div className="wm-u-mtm">
                <button
                  className="js-generate wm-btn--block"
                  onClick={handleZip}
                >
                  Bericht als ZIP-Datei generieren
                </button>
              </div>
              {zipDownloadUrl !== "" && (
                <div className="wm-u-mtm">
                  <a
                    href={`/api/download?zipLocation=${window.btoa(
                      zipDownloadUrl
                    )}`}
                    download
                  >
                    ZIP-Datei herunterladen
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`log-box log-box--small ${logStatus}`} ref={scroller}>
          <div className="log-box--buttons">
            {/* button that controls size of log-box */}
            <button
              className="log-box--button"
              onClick={() => {
                scroller.current.classList.toggle("log-box--small")
              }}
            >
              minmax
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                  fill="#fafafa"
                />
              </svg> */}
            </button>
            {/* button that clears log-box */}
            <button
              className="log-box--button"
              onClick={() => {
                setMessage([""])
              }}
            >
              clear
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13H5v-2h14v2z" fill="#fafafa" />
              </svg> */}
            </button>
          </div>
          {message && (
            <div className="log-box--container">
              {message.map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default UploadPage
