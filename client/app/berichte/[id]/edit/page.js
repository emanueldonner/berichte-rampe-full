//  Seite um einen Bericht zu bearbeiten

"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import useWebSocket from "react-use-websocket"

import dynamic from "next/dynamic"

const ReportSettingsForm = dynamic(
	() => import("../../../components/ConfigForm/ConfigFormNew"),
	{
		ssr: false,
	}
)

import { logMsgs } from "../../../../public/wiener-melange/assets/logMsgs"
import { mockupBerichte } from "../../../utils/mockupBerichte"

function EditPage({ params }) {
	const [socketUrl, setSocketUrl] = useState(null)
	const [message, setMessage] = useState(new Array())
	const [path, setPath] = useState("")
	const [filename, setFilename] = useState("")
	const [success, setSuccess] = useState(false)
	const [readyForZip, setReadyForZip] = useState(false)
	const [zipFilePath, setZipFilePath] = useState("")
	const [zipDownloadUrl, setZipDownloadUrl] = useState("")
	const [logStatus, setLogStatus] = useState("")
	const [previewPathName, setPreviewPathName] = useState("")
	const scroller = useRef(null)
	const addToMessage = (msg) => {
		setMessage((prev) => [...prev, msg])
	}

	const { id } = params
	const bericht = mockupBerichte.find((item) => item.id === id)

	useEffect(() => {
		if (scroller.current) {
			scroller.current.scrollTop = scroller.current.scrollHeight
		}
	}, [message])

	useEffect(() => {
		setSocketUrl(`ws://${process.env.NEXT_PUBLIC_BASE_URL}/log`)
	}, [])

	const { sendJsonMessage } = useWebSocket(socketUrl, {
		onMessage: (event) => {
			const data = JSON.parse(event.data)
			const e = data.event

			if (e == "parselog") {
				const { body } = data
				let header = ""
				let content = ""
				logMsgs.map((msg) => {
					if (msg.ref === body.ref) {
						header = msg.message
						content = msg.explanation
					} else {
					}
				})
				const msg = `${body.level}: ${header} | ${content}`
				addToMessage(msg)
			} else {
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

	const onParseClick = async (data, mode) => {
		try {
			setLogStatus("loading")
			const res = await axios.post("/api/parse", {
				...data,
			})

			addToMessage(res.data.message)
			if (res.data.status === "success") {
				if (mode === "preview") {
					console.log("preview parse", res.data)
					setPreviewPathName(res.data.pathName)
				} else {
					setReadyForZip(true)
					setZipFilePath(res.data.path)
				}
				setLogStatus("")
			}
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
			<h2>{bericht.siteTitle}</h2>
			<div>
				<div>
					{/* <div {...getRootProps()} className={dropzoneStyle}>
						<input id="dropzone" {...getInputProps()} accept=".docx" />
						<label htmlFor="dropzone" className="dropzone-label">
							{isDragActive
								? "Die Datei hier ablegen ..."
								: "Ziehen Sie eine .docx-Datei hierher, oder klicken Sie, um eine Datei auszuwählen"}
						</label>
					</div> */}
					{bericht && (
						<ReportSettingsForm
							path={path}
							filename={filename}
							onParseClick={onParseClick}
							bericht={bericht}
						/>
					)}
					{previewPathName !== "" && (
						<div className="wm-form__grid-md">
							<div className="wm-u-mtm">
								{/* <wm-button color="goldgelb"> */}
								<a
									className="wm-btn--block"
									href={`http://${process.env.NEXT_PUBLIC_BASE_URL}/preview/${previewPathName}/`} // TODO: change to production url
									target="_blank"
								>
									Vorschau-Seite
								</a>
								{/* </wm-button> */}
							</div>
						</div>
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
										href={`/api/download?zipLocation=${zipDownloadUrl}`}
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

export default EditPage
