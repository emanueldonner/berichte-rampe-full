import { useState, useEffect } from "react"

export default function ReportSettingsForm({ path, filename, onParseClick }) {
	const [domainUrl, setDomainUrl] = useState("")
	const [directoryPath, setDirectoryPath] = useState("")
	const [copyright, setCopyright] = useState("")
	const [showSearch, setShowSearch] = useState(false)
	const [showDropdownNavigation, setShowDropdownNavigation] = useState(false)
	const [showLanguageSelection, setShowLanguageSelection] = useState(false)
	const [languages, setLanguages] = useState([{ text: "", link: "" }])
	const [chapterColors, setChapterColors] = useState([
		{ chapterNumber: 1, color: "morgenrot" },
	])
	const [footerInfoTitle, setFooterInfoTitle] = useState("")
	const [footerDepartment, setFooterDepartment] = useState("")
	const [footerArea, setFooterArea] = useState("")
	const [footerEmailText, setFooterEmailText] = useState("")
	const [footerEmail, setFooterEmail] = useState("")
	const [footerPhoneText, setFooterPhoneText] = useState("")
	const [footerPhone, setFooterPhone] = useState("")
	const [footerImprintText, setFooterImprintText] = useState("")
	const [footerImprintUrl, setFooterImprintUrl] = useState("")
	const [footerPrivacyText, setFooterPrivacyText] = useState("")
	const [footerPrivacyUrl, setFooterPrivacyUrl] = useState("")
	const [footerAccessibilityText, setFooterAccessibilityText] = useState("")
	const [footerAccessibilityUrl, setFooterAccessibilityUrl] = useState("")
	const [homeDesign, setHomeDesign] = useState("cards")
	const [excludeFirstChapter, setExcludeFirstChapter] = useState(false)
	const [useWordCoverImage, setUseWordCoverImage] = useState(true)
	const [coverImage, setCoverImage] = useState(null)
	const [coverImageAltText, setCoverImageAltText] = useState("")
	const [isValid, setIsValid] = useState(false)

	useEffect(() => {
		const isValidForm = () => {
			if (!domainUrl.trim() || !directoryPath.trim() || !copyright.trim()) {
				setIsValid(false)
				return
			}
			setIsValid(true)
		}
		isValidForm()
	}, [domainUrl, directoryPath, copyright])

	// Languages
	const addLanguage = () => {
		setLanguages([...languages, { text: "", link: "" }]) // Add a new language input
	}
	const handleLanguageChange = (index, field, value) => {
		const newLanguages = [...languages]
		newLanguages[index][field] = value
		setLanguages(newLanguages)
	}
	const deleteLanguage = (index) => {
		setLanguages(languages.filter((_, i) => i !== index))
	}

	// Chapter colors
	const handleChapterColorChange = (index, key, value) => {
		const newColors = [...chapterColors]
		newColors[index] = { ...newColors[index], [key]: value }
		setChapterColors(newColors)
	}

	const addColor = () => {
		const nextChapterNumber = chapterColors.length
			? chapterColors[chapterColors.length - 1].chapterNumber + 1
			: 1
		setChapterColors([
			...chapterColors,
			{ chapterNumber: nextChapterNumber, color: "morgenrot" },
		])
	}

	const deleteColor = (index) => {
		setChapterColors(chapterColors.filter((_, i) => i !== index))
	}

	const handleSubmit = (event, mode) => {
		event.preventDefault()
		const reportSettings = {
			domain_url: domainUrl,
			directory_path: directoryPath,
			copyright: copyright,
			show_search: showSearch,
			show_dropdown_navigation: showDropdownNavigation,
			show_language_selection: showLanguageSelection,
			languages: languages,
			chapter_colors: chapterColors,
			footer_info_title: footerInfoTitle,
			footer_department: footerDepartment,
			footer_area: footerArea,
			footer_email_text: footerEmailText,
			footer_email: footerEmail,
			footer_phone_text: footerPhoneText,
			footer_phone: footerPhone,
			footer_imprint_text: footerImprintText,
			footer_imprint_url: footerImprintUrl,
			footer_privacy_text: footerPrivacyText,
			footer_privacy_url: footerPrivacyUrl,
			footer_accessibility_text: footerAccessibilityText,
			footer_accessibility_url: footerAccessibilityUrl,
			home_design: homeDesign,
			exclude_first_chapter: excludeFirstChapter,
			use_word_cover_image: useWordCoverImage,
			cover_image: coverImage,
			cover_image_alt_text: coverImageAltText,
			dirPath: path,
			filename: filename,
			mode: mode,
		}
		onParseClick(reportSettings, mode)
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
					<fieldset>
						<legend>Design der Startseite</legend>
						<div>
							<input
								type="radio"
								name="home_design"
								id="home_design_cards"
								value="cards"
								checked={homeDesign === "cards"}
								onChange={() => setHomeDesign("cards")}
							/>
							<label
								className="wm-form-label wm-form-label--radio"
								htmlFor="home_design_cards"
							>
								Kapitel auf Startseite im Cards-Design
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="home_design"
								id="home_design_list"
								value="list"
								checked={homeDesign === "list"}
								onChange={() => setHomeDesign("list")}
							/>
							<label
								className="wm-form-label wm-form-label--radio"
								htmlFor="home_design_list"
							>
								Kapitel auf Startseite als Liste
							</label>
						</div>
					</fieldset>
					<div>
						<input
							type="checkbox"
							name="exclude_first_chapter"
							id="exclude_first_chapter"
							checked={excludeFirstChapter}
							onChange={() => setExcludeFirstChapter(!excludeFirstChapter)}
						/>
						<label className="wm-form-label" htmlFor="exclude_first_chapter">
							Erstes Kapitel von der Nummerierung ausnehmen
						</label>
					</div>
					<fieldset>
						<legend>Cover-Image</legend>
						<div>
							<input
								type="radio"
								name="cover_image_option"
								id="use_word_cover_image"
								value="word"
								checked={useWordCoverImage}
								onChange={() => setUseWordCoverImage(true)}
							/>
							<label
								className="wm-form-label wm-form-label--radio"
								htmlFor="use_word_cover_image"
							>
								Cover-Image der Word-Datei verwenden
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="cover_image_option"
								id="upload_cover_image"
								value="upload"
								checked={!useWordCoverImage}
								onChange={() => setUseWordCoverImage(false)}
							/>
							<label
								className="wm-form-label wm-form-label--radio"
								htmlFor="upload_cover_image"
							>
								Eigenes Cover-Image hochladen
							</label>
							{!useWordCoverImage && (
								<div>
									<input
										type="file"
										name="cover_image"
										id="cover_image"
										onChange={(event) => setCoverImage(event.target.files[0])}
									/>
									<label
										className="wm-form-label"
										htmlFor="cover_image_alt_text"
									>
										Alternativtext für Cover-Image
									</label>
									<input
										type="text"
										name="cover_image_alt_text"
										id="cover_image_alt_text"
										value={coverImageAltText}
										onChange={(event) =>
											setCoverImageAltText(event.target.value)
										}
									/>
								</div>
							)}
						</div>
					</fieldset>
					<div>
						<label className="wm-form-label" htmlFor="domain_url">
							<span>
								Domain URL:<abbr title="Pflichtfeld">*</abbr>
							</span>
						</label>
						<input
							type="text"
							name="domain_url"
							id="domain_url"
							value={domainUrl}
							required
							onChange={(event) => setDomainUrl(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="directory_path">
							<span>
								Pfad des Verzeichnisses:<abbr title="Pflichtfeld">*</abbr>
							</span>
						</label>
						<input
							type="text"
							name="directory_path"
							id="directory_path"
							value={directoryPath}
							required
							onChange={(event) => setDirectoryPath(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="copyright">
							<span>
								Copyright:<abbr title="Pflichtfeld">*</abbr>
							</span>
						</label>
						<input
							type="text"
							name="copyright"
							id="copyright"
							value={copyright}
							required
							onChange={(event) => setCopyright(event.target.value)}
						/>
					</div>
					<div>
						<input
							type="checkbox"
							name="show_search"
							id="show_search"
							checked={showSearch}
							onChange={() => setShowSearch(!showSearch)}
						/>
						<label className="wm-form-label" htmlFor="show_search">
							Suche anzeigen
						</label>
					</div>
					<div>
						<input
							type="checkbox"
							name="show_dropdown_navigation"
							id="show_dropdown_navigation"
							checked={showDropdownNavigation}
							onChange={() =>
								setShowDropdownNavigation(!showDropdownNavigation)
							}
						/>
						<label className="wm-form-label" htmlFor="show_dropdown_navigation">
							Dropdown-Navigation anzeigen
						</label>
					</div>
					<div>
						<input
							type="checkbox"
							name="show_language_selection"
							id="show_language_selection"
							checked={showLanguageSelection}
							onChange={() => setShowLanguageSelection(!showLanguageSelection)}
						/>
						<label className="wm-form-label" htmlFor="show_language_selection">
							Sprachauswahl anzeigen
						</label>
						{showLanguageSelection && (
							<div>
								{languages.map((language, index) => (
									<div key={index}>
										<div>
											<label
												className="wm-form-label"
												htmlFor={`language_${index}_text`}
											>
												Text Sprache {index + 1}
											</label>
											<input
												type="text"
												id={`language_${index}_text`}
												value={language.text}
												onChange={(event) =>
													handleLanguageChange(
														index,
														"text",
														event.target.value
													)
												}
											/>
										</div>
										<div>
											<label
												className="wm-form-label"
												htmlFor={`language_${index}_link`}
											>
												Link Sprache {index + 1}
											</label>
											<input
												type="text"
												id={`language_${index}_link`}
												value={language.link}
												onChange={(event) =>
													handleLanguageChange(
														index,
														"link",
														event.target.value
													)
												}
											/>
										</div>
										<button
											class="wm-btn--small"
											style={{ margin: "1rem 0", fontSize: "1rem" }}
											type="button"
											onClick={() => deleteLanguage(index)}
										>
											Entfernen
										</button>
									</div>
								))}
								<div>
									<button
										style={{ margin: "1rem 0", fontSize: "1.2rem" }}
										type="button"
										onClick={addLanguage}
									>
										(+) weitere Sprache hinzufügen
									</button>
								</div>
							</div>
						)}
					</div>
					<div>
						{chapterColors.map((colorEntry, index) => (
							<div key={index}>
								{/* <div>
								<label className="wm-form-label" htmlFor={`chapter_${index}`}>
									Kapitel Nummer {index + 1}
								</label>
								<input
									type="number"
									id={`chapter_${index}`}
									value={colorEntry.chapterNumber}
									min="1"
									onChange={(event) =>
										handleChapterColorChange(
											index,
											"chapterNumber",
											Number(event.target.value)
										)
									}
								/>
							</div> */}
								<div>
									<label className="wm-form-label" htmlFor={`color_${index}`}>
										Farbe Kapitel {colorEntry.chapterNumber}
									</label>
									<select
										id={`color_${index}`}
										value={colorEntry.color}
										onChange={(event) =>
											handleChapterColorChange(
												index,
												"color",
												event.target.value
											)
										}
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
								<button
									class="wm-btn--small"
									style={{ margin: "1rem 0", fontSize: "1rem" }}
									type="button"
									onClick={() => deleteColor(index)}
								>
									Entfernen
								</button>
							</div>
						))}
						<div>
							<button
								style={{ margin: "1rem 0", fontSize: "1.2rem" }}
								type="button"
								onClick={addColor}
							>
								(+) zusätzliche Farbe für nächstes Kapitel
							</button>
						</div>
					</div>
					<hr />
					<div>
						<h2>Footer</h2>

						<label className="wm-form-label" htmlFor="footer_info_title">
							Titel Infobereich im Footer
						</label>
						<input
							type="text"
							name="footer_info_title"
							id="footer_info_title"
							value={footerInfoTitle}
							onChange={(event) => setFooterInfoTitle(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_department">
							Abteilung
						</label>
						<input
							type="text"
							name="footer_department"
							id="footer_department"
							value={footerDepartment}
							onChange={(event) => setFooterDepartment(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_area">
							Fachbereich
						</label>
						<input
							type="text"
							name="footer_area"
							id="footer_area"
							value={footerArea}
							onChange={(event) => setFooterArea(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_email_text">
							E-Mail-Text
						</label>
						<input
							type="text"
							name="footer_email_text"
							id="footer_email_text"
							value={footerEmailText}
							onChange={(event) => setFooterEmailText(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_email">
							E-Mail-Adresse
						</label>
						<input
							type="email"
							name="footer_email"
							id="footer_email"
							value={footerEmail}
							onChange={(event) => setFooterEmail(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_phone_text">
							Telefon-Text
						</label>
						<input
							type="text"
							name="footer_phone_text"
							id="footer_phone_text"
							value={footerPhoneText}
							onChange={(event) => setFooterPhoneText(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_phone">
							Telefon-Nummer
						</label>
						<input
							type="tel"
							name="footer_phone"
							id="footer_phone"
							value={footerPhone}
							onChange={(event) => setFooterPhone(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_imprint_text">
							Impressum-Text
						</label>
						<input
							type="text"
							name="footer_imprint_text"
							id="footer_imprint_text"
							value={footerImprintText}
							onChange={(event) => setFooterImprintText(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_imprint_url">
							Impressum-URL
						</label>
						<input
							type="url"
							name="footer_imprint_url"
							id="footer_imprint_url"
							value={footerImprintUrl}
							onChange={(event) => setFooterImprintUrl(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_privacy_text">
							Datenschutz-Text
						</label>
						<input
							type="text"
							name="footer_privacy_text"
							id="footer_privacy_text"
							value={footerPrivacyText}
							onChange={(event) => setFooterPrivacyText(event.target.value)}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_privacy_url">
							Datenschutz-URL
						</label>
						<input
							type="url"
							name="footer_privacy_url"
							id="footer_privacy_url"
							value={footerPrivacyUrl}
							onChange={(event) => setFooterPrivacyUrl(event.target.value)}
						/>
					</div>
					<div>
						<label
							className="wm-form-label"
							htmlFor="footer_accessibility_text"
						>
							Barrierefreiheit-Text
						</label>
						<input
							type="text"
							name="footer_accessibility_text"
							id="footer_accessibility_text"
							value={footerAccessibilityText}
							onChange={(event) =>
								setFooterAccessibilityText(event.target.value)
							}
						/>
					</div>
					<div>
						<label className="wm-form-label" htmlFor="footer_accessibility_url">
							Barrierefreiheit-URL
						</label>
						<input
							type="url"
							name="footer_accessibility_url"
							id="footer_accessibility_url"
							value={footerAccessibilityUrl}
							onChange={(event) =>
								setFooterAccessibilityUrl(event.target.value)
							}
						/>
					</div>
				</div>
			</fieldset>
			<div className="wm-form__grid-md">
				<div className="wm-u-mtm">
					<button
						className="wm-btn--block"
						disabled={!isValid}
						onClick={(event) => handleSubmit(event, "preview")}
					>
						Vorschau generieren
					</button>
				</div>
			</div>
			<div className="wm-form__grid-md">
				<div className="wm-u-mtm">
					<button
						className="wm-btn--block"
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
