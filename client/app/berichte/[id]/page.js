"use client"

import React from "react"
import Link from "next/link"
import { mockupBerichte } from "../../utils/mockupBerichte"

const BerichteDetailPage = ({ params }) => {
	const { id } = params
	const bericht = mockupBerichte.find((item) => item.id === id)

	if (!bericht) {
		return <div>Bericht nicht gefunden.</div>
	}

	return (
		<div>
			<table>
				<tr>
					<td>SiteLang</td>
					<td>{bericht.siteLang}</td>
				</tr>
				<tr>
					<td>SiteTitle</td>
					<td>{bericht.siteTitle}</td>
				</tr>
				<tr>
					<td>SiteDescription</td>
					<td>{bericht.siteDescription}</td>
				</tr>
				<tr>
					<td>SiteColor</td>
					<td>{bericht.siteColor}</td>
				</tr>
			</table>
			<Link href={`/berichte/${bericht.id}/edit`}>Bericht bearbeiten</Link>
		</div>
	)
}

export default BerichteDetailPage
