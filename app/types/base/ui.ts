import type { icons } from '~/data/ui/icons'

type MIconName = keyof typeof icons
type MIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string

// Semantic tones shared by badges. A tone is never the only signal —
// every use pairs it with a word or an icon.
type Tone = 'neutral' | 'brand' | 'accent' | 'sun' | 'success' | 'inverse'

interface BreadcrumbItem {
	label: string
	to?: string
}

export type {
	MIconName,
	MIconSize,
	Tone,
	BreadcrumbItem,
}
