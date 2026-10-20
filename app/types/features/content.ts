// Static page copy: the home sections and the contact details.
import type { MIconName } from '~/types/base/ui'

interface ContentPoint {
	icon: MIconName
	title: string
	text: string
}

interface Role {
	// "Oct 2022"
	start: string
	// null while it's the current role
	end: string | null
	title: string
	org: string
	summary: string
	// the main languages and tools of the role
	tags: string[]
}

interface ToolGroup {
	icon: MIconName
	title: string
	text: string
	tools: string[]
}

// Education, certificates, and seminars.
interface Credential {
	icon: MIconName
	title: string
	place: string
	years: string
}

interface ContactDetails {
	email: string
	phone: string
	phone_href: string
	location: string
	resume: string
}

export type {
	ContentPoint,
	Role,
	ToolGroup,
	Credential,
	ContactDetails,
}
