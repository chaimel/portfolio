// Formatting helpers.
import type { Role } from '~/types/features/content'

// "https://www.beulahlandjax.org/" -> "beulahlandjax.org"
function hostLabel(url: string): string {
	try {
		return new URL(url).host.replace(/^www\./, '')
	}
	catch {
		return url
	}
}

// "Oct 2022 — Present"
function roleDates(role: Role): string {
	return `${role.start} — ${role.end ?? 'Present'}`
}

export {
	hostLabel,
	roleDates,
}
