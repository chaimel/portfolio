// Every project in the portfolio. Duelo Battleground is the featured
// web app with a case study; Musticker (maintained at Glophics) and the
// WordPress sites link straight out.
// Images live in public/images/projects (see README → Images).
//
// `stack` lists what each live site actually loads (checked October
// 2026: theme and plugin folders, script tags, Duelo's and Musticker's
// JS bundles; Musticker's API answers with Laravel's session cookies).
// The WordPress themes are custom builds — each site has its own.
// `accent` is each client's brand color, sampled from its screenshot.
import type { Project, ProjectImage } from '~/types/features/project'

const duelo_images = '/images/projects/duelo-battleground'

// Two 400×250 crops of a full-page capture — the top of the page and a
// stretch further down — for the hero wall (public/images/projects/wall).
function wallShots(slug: string, title: string): ProjectImage[] {
	return [1, 2].map(part => ({
		src: `/images/projects/wall/${slug}-${part}.webp`,
		width: 400,
		height: 250,
		alt: `${title}, ${part === 1 ? 'top of the page' : 'further down the page'}`,
	}))
}

// a WordPress theme is PHP templates plus the front-end layer
const wordpress_languages = ['PHP', 'HTML', 'CSS', 'JavaScript']

const duelo_phone_home: ProjectImage = {
	src: `${duelo_images}/home-mobile.webp`,
	width: 600,
	height: 1298,
	alt: 'The Duelo Battleground home page on a phone',
}

const duelo: Project = {
	slug: 'duelo-battleground',
		accent: '#f25c2a',
	title: 'Duelo Battleground',
	kind: 'web-app',
	status: 'live',
	category: 'Court booking web app',
	languages: ['TypeScript', 'HTML', 'SCSS'],
	stack: ['Nuxt', 'Vue 3', 'Pinia', 'Firebase', 'date-fns', 'REST API'],
	live_url: 'https://duelobattleground.com/',
	image: {
		src: `${duelo_images}/full-page.webp`,
		width: 1280,
		height: 1624,
		alt: 'Duelo Battleground home page',
	},
	cover: {
		src: `${duelo_images}/home.webp`,
		width: 1600,
		height: 1000,
		alt: 'Duelo Battleground home page: “Book Your Court, Play Your Game!” over a photo of the training facility',
	},
	phone: duelo_phone_home,
	summary: 'Online court booking for a badminton training facility in Cebu City. Players pick a date, choose hourly slots across five courts, pay online, and get a QR pass that starts live scoring at the net.',
	wall: [
		{ src: '/images/projects/wall/duelo-battleground-1.webp', width: 400, height: 250, alt: 'Duelo Battleground home page' },
		{ src: '/images/projects/wall/duelo-battleground-2.webp', width: 400, height: 250, alt: 'Duelo Battleground booking page' },
	],
	role: 'Front-end developer',
	features: [
		'Date strip with a full-calendar fallback',
		'Court-by-hour grid with five slot states',
		'Booking summary that holds payment until the terms are accepted',
		'Mobile booking bar that keeps the total in reach',
	],
	callouts: [
		{ icon: 'light-table', text: '5 courts · 6 AM to midnight' },
		{ icon: 'light-qr-code', text: 'QR pass starts live scoring' },
	],
	case_study: {
		lede: 'A court booking web app for a badminton training facility in Cebu City: pick a date and courts, pay online, and walk in with a QR pass — in about two minutes.',
		product: [
			'Duelo Battleground is a badminton training facility in Cebu City with five courts, named D, U, E, L, and O. Its website lets players reserve those courts online instead of calling the front desk.',
			'A booking is a short, guided flow: choose a date, choose hourly slots on one court or several, accept the booking terms, and pay. The QR pass arrives as soon as payment clears, and scanning it at the net starts live scoring.',
		],
		role: [
			'I’m the front-end developer on Duelo Battleground. I build the Nuxt app that players use — the pages, the booking flow, and the screens around it — on top of the facility’s booking API.',
		],
		built: [
			'The booking page: date strip, court-by-hour grid, and booking summary',
			'Disabled states that say what’s still missing before payment',
			'A court layout map with a link to the court gallery',
			'Sign-in, sign-up, and trainer registration screens',
			'Responsive layouts, from phones to wide desktops',
		],
		flow: {
			eyebrow: 'The booking flow',
			title: 'From picking a date to playing, in five steps.',
			lede: 'The booking page carries most of the product, so every step before payment happens on one screen.',
			image: {
				src: `${duelo_images}/booking.webp`,
				width: 1600,
				height: 1000,
				alt: 'The booking page with a date picked, the court-by-hour grid open, and the booking summary beside it',
			},
			url: 'duelobattleground.com/reservations',
			steps: [
				{ icon: 'light-calendar', title: 'Choose a date', text: 'A scrolling strip shows the next three weeks; a calendar button reaches any other day.' },
				{ icon: 'light-table', title: 'Choose your times', text: 'An hourly grid lists every court from 6 AM to midnight. Book several courts at once — each keeps its own hours.' },
				{ icon: 'light-square-check', title: 'Review and agree', text: 'The summary shows the date and total, and payment stays locked until the player accepts the booking, payment, and facility terms.' },
				{ icon: 'light-credit-card', title: 'Pay online', text: 'Players pay on the site to confirm the booking.' },
				{ icon: 'light-qr-code', title: 'Scan in and play', text: 'The QR pass arrives the moment payment clears. Scanning it at the net starts live scoring.' },
			],
		},
		highlights: {
			eyebrow: 'Front-end details',
			title: 'The pieces that keep booking quick.',
			lede: 'Most of the work is in small states and edge cases: what a slot looks like, what a disabled button says, where the total lives on a phone.',
			items: [
				{ icon: 'light-calendar', title: 'Date strip', text: 'A horizontal strip of days with arrow controls and a month marker, plus a calendar for dates further out.' },
				{ icon: 'light-table', title: 'Court-by-hour grid', text: 'Five courts side by side and one row per hour from 6 AM to midnight. On phones the grid scrolls sideways.' },
				{ icon: 'light-layers', title: 'Five slot states', text: 'Selected, available, reserved, your booking, and unavailable — each with its own swatch in the legend.' },
				{ icon: 'light-lock', title: 'Guarded checkout', text: '“Continue to payment” stays disabled until the booking is complete, and the button explains what’s still missing.' },
				{ icon: 'light-smartphone', title: 'Mobile booking bar', text: 'On phones the summary folds into a bar at the bottom of the screen, so the total stays in reach while players pick times.' },
				{ icon: 'light-map', title: 'Court layout', text: 'A floor plan shows where each court sits, with a link through to the court gallery.' },
			],
		},
		screens: [
			{
				image: {
					src: `${duelo_images}/court-layout.webp`,
					width: 1600,
					height: 1000,
					alt: 'Court layout dialog: a floor plan with courts D, U, E, L, and O, the comfort rooms, and the lobby',
				},
				device: 'desktop',
				caption: 'Court layout — where each court sits on the floor.',
				url: 'duelobattleground.com/reservations',
			},
			{
				image: {
					src: `${duelo_images}/booking-mobile.webp`,
					width: 600,
					height: 1298,
					alt: 'The booking page on a phone, with the date strip, the court grid, and the booking bar at the bottom',
				},
				device: 'mobile',
				caption: 'Booking on a phone: the summary rides along at the bottom.',
			},
			{
				image: duelo_phone_home,
				device: 'mobile',
				caption: 'The home page on a phone.',
			},
		],
	},
}

// In the order the work stack shows them: current work first, sites no
// longer online last.
const moreWork: Project[] = [
	{
		slug: 'musticker',
		accent: '#f5df4d',
		title: 'Musticker',
		kind: 'web-app',
		status: 'live',
		category: 'Custom sticker shop',
		built_at: 'Glophics',
		summary: 'Glophics’ own online sticker print shop for Korea. Customers order die-cut, roll, and sheet stickers, approve a proof, and get them made today and shipped tomorrow.',
		scope: {
			parts: ['Admin panel', 'Customer account pages', 'Category pages'],
			note: 'Mostly maintenance. The admin panel sits behind a staff login, so the preview shows the public storefront.',
		},
		languages: ['PHP', 'JavaScript', 'HTML', 'CSS'],
		stack: ['Nuxt', 'Vue 3', 'Pinia', 'Nuxt i18n', 'Laravel', 'AWS S3'],
		live_url: 'https://www.musticker.com/kr/',
		image: { src: '/images/projects/musticker.webp', width: 800, height: 1789, alt: 'Musticker storefront home page' },
		wall: wallShots('musticker', 'Musticker'),
	},
	{
		slug: 'beulahland-christian-academy',
		accent: '#e39b2d',
		title: 'Beulahland Christian Academy',
		kind: 'website',
		status: 'live',
		category: 'Childcare & school website',
		built_at: 'Proweaver',
		summary: 'A Christian childcare center and academy in Jacksonville, Florida.',
		languages: wordpress_languages,
		stack: ['WordPress', 'Custom theme', 'Master Slider', 'Font Awesome'],
		live_url: 'https://www.beulahlandjax.org/',
		image: { src: '/images/projects/beulahland-christian-academy.webp', width: 800, height: 2056, alt: 'Beulahland Christian Academy website' },
		wall: wallShots('beulahland-christian-academy', 'Beulahland Christian Academy'),
	},
	{
		slug: 'spark-city-smoke-and-vape',
		accent: '#5a2340',
		title: 'Spark City Smoke and Vape',
		kind: 'website',
		status: 'live',
		category: 'Retail website',
		summary: 'A smoke and vape shop. The site checks each visitor’s age before letting them in.',
		languages: wordpress_languages,
		stack: ['WordPress', 'Custom theme', 'jQuery', 'Age Gate', 'Font Awesome'],
		live_url: 'https://web.link2newsite.com/limelightll/sparkcityon575/',
		image: { src: '/images/projects/spark-city-smoke-and-vape.webp', width: 800, height: 2283, alt: 'Spark City Smoke and Vape website' },
		wall: wallShots('spark-city-smoke-and-vape', 'Spark City Smoke and Vape'),
	},
	{
		slug: 'salmastar-fishing-group',
		accent: '#0c3f77',
		title: 'SalmaStar Fishing Group',
		kind: 'website',
		status: 'live',
		category: 'Company website',
		built_at: 'Proweaver',
		summary: 'A fishing company based in Somalia.',
		languages: wordpress_languages,
		stack: ['WordPress', 'Custom theme', 'jQuery', 'Font Awesome'],
		live_url: 'https://w3204.proweaversite3.com/',
		image: { src: '/images/projects/salmastar-fishing-group.webp', width: 800, height: 2049, alt: 'SalmaStar Fishing Group website' },
		wall: wallShots('salmastar-fishing-group', 'SalmaStar Fishing Group'),
	},
	{
		slug: 'smt-logistics',
		accent: '#cf100f',
		title: 'SMT Logistics',
		kind: 'website',
		status: 'live',
		category: 'Logistics website',
		built_at: 'Proweaver',
		summary: 'A California logistics company that hauls food-grade products, including milk.',
		languages: wordpress_languages,
		stack: ['WordPress', 'Custom theme', 'Font Awesome'],
		live_url: 'https://www.smtlg.com/',
		image: { src: '/images/projects/smt-logistics.webp', width: 800, height: 1804, alt: 'SMT Logistics website' },
		wall: wallShots('smt-logistics', 'SMT Logistics'),
	},
	{
		// the client's site now shows "temporarily unavailable" behind an expired certificate
		slug: 'summerfield-home-care',
		accent: '#3fb86a',
		title: 'Summerfield Home Care',
		kind: 'website',
		status: 'offline',
		category: 'Healthcare website',
		summary: 'A care home in Santa Rosa, California, offering personal care and companionship.',
		languages: wordpress_languages,
		stack: ['WordPress'],
		live_url: 'https://www.summerfieldhomecare.com/',
		image: { src: '/images/projects/summerfield-home-care.webp', width: 800, height: 1958, alt: 'Summerfield Home Care website' },
		wall: wallShots('summerfield-home-care', 'Summerfield Home Care'),
	},
	{
		// the client's domain no longer resolves
		slug: 'skyguide-llc',
		accent: '#20628d',
		title: 'Skyguide LLC',
		kind: 'website',
		status: 'offline',
		category: 'Services website',
		summary: 'A drone company offering aerial videography and photography.',
		languages: wordpress_languages,
		stack: ['WordPress'],
		live_url: 'http://www.skyguidellc.com/',
		image: { src: '/images/projects/skyguide-llc.webp', width: 800, height: 1762, alt: 'Skyguide LLC website' },
		wall: wallShots('skyguide-llc', 'Skyguide LLC'),
	},
]

const featuredProject = duelo
const projects: Project[] = [duelo, ...moreWork]

export {
	featuredProject,
	moreWork,
	projects,
}
