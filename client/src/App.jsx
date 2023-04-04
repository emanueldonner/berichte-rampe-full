import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import useWebSocket from "react-use-websocket"

import { logMsgs } from "./logMsgs"

import "./assets/css/critical.min.css"
import "./assets/css/main.min.css"
import "./App.css"

function ReportSettingsForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add code to handle form submission
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
          <button className="js-generate wm-btn--block" disabled>
            Bericht generieren
          </button>
        </div>
      </div>
    </form>
  )
}

function App() {
  const [message, setMessage] = useState(new Array())
  const [path, setPath] = useState("")
  const [filename, setFilename] = useState("")
  const [success, setSuccess] = useState(false)
  const addToMessage = (msg) => {
    setMessage((prev) => [...prev, msg])
  }
  const { sendJsonMessage } = useWebSocket(
    `ws://${window.location.hostname}:5000/api/log`,
    {
      onMessage: (event) => {
        // console.log("WebSocket message:", JSON.parse(event.data))
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
    }
  )

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles)
    try {
      const formData = new FormData()
      formData.append("file", acceptedFiles[0])

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      addToMessage(res.data.message)
      setSuccess(true)
      setPath(res.data.path)
      setFilename(res.data.filename)
    } catch (error) {
      addToMessage(error.response.data.message)
    }
  }, [])

  const onParseClick = async () => {
    try {
      const res = await axios.post("/api/parse", {
        path,
        filename,
      })

      addToMessage(res.data.message)
    } catch (error) {
      addToMessage(error.response.data.message)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const dropzoneStyle = isDragActive
    ? "dropzone-container dropzone-active"
    : "dropzone-container"
  // const dropzoneStyleString = JSON.stringify(dropzoneStyle)
  return (
    <main>
      <h2>File Upload</h2>
      <div>
        <div>
          <button
            onClick={() => {
              try {
                sendJsonMessage({ message: "Hello from client" })
              } catch (error) {
                console.error("catch: ", error)
              }
            }}
          >
            send ws msg
          </button>
          <div {...getRootProps()} className={dropzoneStyle}>
            <input id="dropzone" {...getInputProps()} accept=".docx" />
            <label htmlFor="dropzone" className="dropzone-label">
              {isDragActive
                ? "Drop the file here ..."
                : "Drag and drop a .docx file here, or click to select file"}
            </label>
          </div>
          <ReportSettingsForm />
          {success && <button onClick={() => onParseClick()}>Parse!</button>}
        </div>

        <div className="log-box">
          {message && (
            <>
              {message.map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
