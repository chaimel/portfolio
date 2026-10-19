import crypto from "crypto"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SRC_DIR = path.resolve(__dirname, "src")
const PUBLIC_SPRITE = path.resolve(__dirname, "../../public/icons/sprite.svg")
const DATA_FILE_UI = path.resolve(__dirname, "../../app/data/ui/icons.ts")

fs.mkdirSync(path.dirname(PUBLIC_SPRITE), { recursive: true })
fs.mkdirSync(path.dirname(DATA_FILE_UI), { recursive: true })

const icons = {}
let symbols = ""

function normalizeSvgColors(svgBody) {
	return svgBody.replace(/\s(fill|stroke)="([^"]*)"/g, (full, attr, value) => {
		const normalized = String(value).trim().toLowerCase()
		if (
			normalized === "none" ||
      normalized === "currentcolor" ||
      normalized.startsWith("url(")
		) {
			return full
		}
		return ` ${attr}="currentColor"`
	})
}

function normalizeName(folder, file) {
	let base = file.replace(".svg", "")
	base = base.replace(/^(l|r|s|b)\./, "")
	base = base.replace(/[._]/g, "-")

	let prefix = "brand"
	if (folder === "light") prefix = "light"
	else if (folder === "regular") prefix = "regular"
	else if (folder === "strong") prefix = "strong"
	else if (folder === "brand-icons") prefix = "brand"

	return `${prefix}-${base}`
}

function walk(dir) {
	// sorted, so the sprite (and its version hash) only changes when an icon does
	const entries = fs.readdirSync(dir, { withFileTypes: true })
		.sort((a, b) => a.name.localeCompare(b.name))

	for (const entry of entries) {
		const full = path.join(dir, entry.name)

		if (entry.isDirectory()) {
			walk(full)
			continue
		}

		if (!entry.name.endsWith(".svg")) continue

		const folder = path.basename(path.dirname(full))
		const svg = fs.readFileSync(full, "utf8")
		const match = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
		if (!match) continue

		const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] || "0 0 24 24"
		const name = normalizeName(folder, entry.name)
		const id = `icon-${name}`

		let body = match[1].trim()
		body = normalizeSvgColors(body)

		symbols += `
  <symbol id="${id}" viewBox="${viewBox}">
    ${body}
  </symbol>`

		icons[name] = { id, viewBox }
	}
}

walk(SRC_DIR)

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
${symbols}
</svg>`

// A content hash rather than a timestamp: the sprite URL still busts caches
// when an icon changes, and an unchanged set leaves the working tree clean.
const iconSpriteVersion = crypto.createHash("sha1").update(sprite).digest("hex").slice(0, 10)

fs.writeFileSync(PUBLIC_SPRITE, sprite)
fs.writeFileSync(
	DATA_FILE_UI,
	`export const iconSpriteVersion = "${iconSpriteVersion}" as const\nexport const icons = ${JSON.stringify(icons, null, 2)} as const\n`
)

console.log(`Icons built -> sprite + typed data (${Object.keys(icons).length} icons)`)
