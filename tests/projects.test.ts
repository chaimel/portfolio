import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { aboutFacts, approachPoints, credentials, toolGroups } from '../app/data/features/home.ts'
import { featuredProject, projects } from '../app/data/features/projects.ts'
import { icons } from '../app/data/ui/icons.ts'

const public_dir = new URL('../public/', import.meta.url)

function inPublic(src: string) {
	return existsSync(fileURLToPath(new URL(src.replace(/^\//, ''), public_dir)))
}

test('project slugs are unique', () => {
	const slugs = projects.map(project => project.slug)
	assert.equal(new Set(slugs).size, slugs.length)
})

test('every project image is in public/', () => {
	for (const project of projects) {
		const study = project.case_study
		const images = [
			project.image,
			project.cover,
			project.phone,
			study?.flow.image,
			...(study?.screens.map(screen => screen.image) ?? []),
		].filter(image => image !== undefined)

		for (const image of images) {
			assert.ok(inPublic(image.src), `${project.slug}: missing ${image.src}`)
			assert.ok(image.width > 0 && image.height > 0, `${project.slug}: ${image.src} needs its real size`)
			assert.ok(image.alt.length > 0, `${project.slug}: ${image.src} needs alt text`)
		}
	}
})

test('every project says what it is, and what it was built in and with', () => {
	for (const project of projects) {
		assert.ok(project.summary, `${project.slug}: no summary`)
		assert.match(project.accent ?? '', /^#[0-9a-f]{6}$/i, `${project.slug}: accent must be a 6-digit hex color`)
		assert.ok(project.languages.length > 0, `${project.slug}: no languages`)
		assert.ok(project.stack.length > 0, `${project.slug}: no stack`)
	}
})

test('the featured project has its case study and live link', () => {
	assert.ok(featuredProject.case_study, 'the featured project needs a case study page')
	assert.equal(featuredProject.status, 'live')
	assert.match(featuredProject.live_url, /^https:\/\//)
})

test('every icon the content names exists in the sprite', () => {
	const study = featuredProject.case_study
	const names = [
		...aboutFacts.map(fact => fact.icon),
		...approachPoints.map(point => point.icon),
		...credentials.map(credential => credential.icon),
		...toolGroups.map(group => group.icon),
		...(featuredProject.callouts ?? []).map(callout => callout.icon),
		...(study?.flow.steps ?? []).map(step => step.icon),
		...(study?.highlights.items ?? []).map(item => item.icon),
	]

	for (const name of names) {
		assert.ok(name in icons, `unknown icon: ${name}`)
	}
})
