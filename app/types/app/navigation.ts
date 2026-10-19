interface NavLink {
	label: string
	to: string
	// the home-page section the link scrolls to; the header marks the
	// link active while that section is on screen
	section?: string
}

export type {
	NavLink,
}
