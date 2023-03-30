import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import useWebSocket from "react-use-websocket"

import "./App.css"

function App() {
  const [message, setMessage] = useState("")
  const [path, setPath] = useState("")
  const [filename, setFilename] = useState("")

  const { sendJsonMessage } = useWebSocket(
    `ws://${window.location.hostname}:5000/api/log`,
    {
      onMessage: (event) => {
        // console.log("WebSocket message:", JSON.parse(event.data))
        const data = JSON.parse(event.data)
        console.log("data type:", typeof data)
        console.log("WebSocket message:", data)
        // data.map((msg) => {
        //   setMessage((prev) => prev + msg)
        // })
        setMessage(data.msg)
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

      setMessage((prev) => prev + res.data.message)
      setPath(res.data.path)
      setFilename(res.data.filename)
    } catch (error) {
      setMessage((prev) => prev + error.response.data.message)
    }
  }, [])

  const onParseClick = async () => {
    try {
      const res = await axios.post("/api/parse", {
        path,
        filename,
      })

      setMessage((prev) => prev + res.data.message)
    } catch (error) {
      setMessage((prev) => prev + error.response.data.message)
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
        <label for="dropzone" className="dropzone-label">
          {isDragActive
            ? "Drop the file here ..."
            : "Drag and drop a .docx file here, or click to select file"}
        </label>
      </div>
      <div className="log-box">{message && <p>{message}</p>}</div>
      {message?.includes("success") && (
        <button onClick={() => onParseClick()}>Parse!</button>
      )}
    </main>
  )
}

export default App
