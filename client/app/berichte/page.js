"use client"

import React from "react"
import { mockupBerichte } from "../utils/mockupBerichte"
import Link from "next/link"

const BerichtePage = () => {
	return (
		<div>
			<h2>Berichte</h2>
			<div className="berichte-list">
				<ul>
					{mockupBerichte.map((item, index) => (
						<li key={index}>
							<Link href={`/berichte/${item.id}`}>{item.siteTitle}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default BerichtePage
