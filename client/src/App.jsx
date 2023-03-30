import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"

import "./App.css"

function App() {
  const [message, setMessage] = useState("")
  const [path, setPath] = useState("")
  const [filename, setFilename] = useState("")
  const [ws, setWs] = useState(null) // Add WebSocket state
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

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/api/log`)
    console.log(ws)
    ws.onopen = () => {
      console.log("WebSocket connected")
    }
    ws.onmessage = (event) => {
      setMessage((prev) => prev + event.data) // Append received log message to state
    }
    setWs(ws)
    // return () => {
    //   ws.close()
    // }
  }, [])

  return (
    <div>
      <h2>File Upload</h2>
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
