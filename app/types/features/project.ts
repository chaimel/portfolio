// Portfolio projects and the case-study pages built from them.
import type { MIconName } from '~/types/base/ui'

// width and height are the file's real pixels: they reserve the
// layout box and size the scroll-on-hover preview
interface ProjectImage {
	src: string
	width: number
	height: number
	alt: string
}

type ProjectKind = 'web-app' | 'website'

// offline: the client's site is gone — the card keeps the screenshot
// but drops the link
type ProjectStatus = 'live' | 'offline'

// what I did on a project I didn't build end to end: cards say
// "Maintained at", list the parts, and show the note
interface ProjectScope {
	parts: string[]
	// e.g. why the screenshot can't show those parts
	note?: string
}

interface ProjectCallout {
	icon: MIconName
	text: string
}

interface CaseStudyStep {
	icon: MIconName
	title: string
	text: string
}

interface CaseStudyScreen {
	image: ProjectImage
	device: 'desktop' | 'mobile'
	caption: string
	// the address shown in a desktop frame's bar
	url?: string
}

// a section's heading copy
interface CaseStudyHead {
	eyebrow: string
	title: string
	lede: string
}

interface CaseStudy {
	lede: string
	// paragraphs
	product: string[]
	role: string[]
	built: string[]
	// the main user journey, step by step, beside one screenshot
	flow: CaseStudyHead & {
		image: ProjectImage
		// the screenshot's address, shown in the browser bar
		url: string
		steps: CaseStudyStep[]
	}
	highlights: CaseStudyHead & {
		items: CaseStudyStep[]
	}
	screens: CaseStudyScreen[]
}

interface Project {
	slug: string
	title: string
	kind: ProjectKind
	status: ProjectStatus
	// "Court booking web app", "School website"
	category: string
	// the client's brand color as hex; tints the project's card and preview
	accent?: string
	// the employer it was built at, when the site credits one
	built_at?: string
	// what the code is written in: "PHP", "TypeScript"…
	languages: string[]
	// platforms, frameworks, and libraries: "WordPress", "Nuxt", "Pinia"…
	stack: string[]
	live_url: string
	// a full-page capture: cards pin its top and scroll it on hover
	image: ProjectImage
	// one desktop screen (16:10) and one phone screen, for showcases
	cover?: ProjectImage
	phone?: ProjectImage
	summary?: string
	role?: string
	scope?: ProjectScope
	// short highlight bullets for the featured spot on the home page
	features?: string[]
	// two short labels pinned over the featured screenshot
	callouts?: ProjectCallout[]
	case_study?: CaseStudy
}

export type {
	ProjectImage,
	ProjectKind,
	ProjectStatus,
	ProjectScope,
	ProjectCallout,
	CaseStudyStep,
	CaseStudyScreen,
	CaseStudyHead,
	CaseStudy,
	Project,
}
