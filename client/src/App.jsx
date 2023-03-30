import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import useWebSocket from "react-use-websocket"

import "./App.css"

function App() {
  const [message, setMessage] = useState("")
  const [path, setPath] = useState("")
  const [filename, setFilename] = useState("")
  const [handleSend, setHandleSend] = useState(() => {})
  const { sendJsonMessage } = useWebSocket(
    `ws://${window.location.hostname}:5000/api/log`,
    {
      onMessage: (event) => {
        console.log("WebSocket message:", event.data)
        setMessage((prev) => prev + event.data)
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

      setMessage(res.data.message)
      setPath(res.data.path)
      setFilename(res.data.filename)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }, [])

  const onParseClick = async () => {
    try {
      const res = await axios.post("/api/parse", {
        path,
        filename,
      })

      setMessage(res.data.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
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
      <div {...getRootProps()}>
        <input {...getInputProps()} accept=".docx" />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag and drop a .docx file here, or click to select file</p>
        )}
      </div>
      {message && <p>{message}</p>}
      {message?.includes("success") && (
        <button onClick={() => onParseClick()}>Parse!</button>
      )}
    </div>
  )
}

export default App
