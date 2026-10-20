// Home page copy. Counts are computed from the data (projects, roles)
// wherever the data holds them all; the sites-shipped total is typed in
// because it's far more than this portfolio lists. The story, education,
// and seminars come from the résumé in public/.
import type { ContentPoint, Credential, Role, StatementPart, ToolGroup } from '~/types/features/content'

const hero = {
	status: 'Available for web developer roles and freelance work',
	eyebrow: 'Web Developer · Front-End Focus · Cebu, PH',
	name: 'Chaimel',
	line: 'I build clean, fast,',
	// similar lengths keep the headline from jumping as they rotate
	words: ['responsive', 'accessible', 'maintainable', 'dependable'],
	tail: 'websites.',
	lede: 'I build and maintain websites and web apps with Nuxt, Vue, Laravel, and WordPress — most recently the booking front end for Duelo Battleground, a badminton facility in Cebu City.',
	years: '5+',
	// every WordPress site shipped, not just the ones shown in Work
	sites_shipped: '100+',
}

const work = {
	title: `What I maintain now, and a few of the ${hero.sites_shipped} sites I’ve shipped.`,
	lede: 'At Glophics I keep Musticker’s admin panel and account pages running. Before that I built more than a hundred custom WordPress sites — here are six, for childcare, retail, fishing, logistics, healthcare, and aerial photography clients — with the languages and tools behind each one.',
	hint: 'Hover a project to see it. Click to scroll through the whole page.',
}

const approachPoints: ContentPoint[] = [
	{ icon: 'light-wrench', title: 'Build', text: 'Custom WordPress themes and Nuxt.js front ends, from design to live launch.' },
	{ icon: 'light-search', title: 'Review', text: 'I check AI-assisted code for accessibility, responsiveness, correctness, and maintainability.' },
	{ icon: 'light-trending-up', title: 'Improve', text: 'Faster loads, better responsiveness, and cleaner code as the site grows.' },
]

// About's big opening line; its words light up as it scrolls through
const statement: StatementPart[] = [
	{ text: 'I’m a web developer in Cebu who has shipped ' },
	{ stat: hero.sites_shipped },
	{ text: ' WordPress sites. Today I keep ' },
	{ project: 'musticker' },
	{ text: ' running at Glophics, and I built the booking front end for ' },
	{ project: 'duelo-battleground' },
	{ text: '. I care about pages that load fast, read clearly, and stay easy to maintain.' },
]

const about = {
	statement,
	title: 'Web developer focused on clear delivery and maintainable front ends.',
	// my story, in order: where I'm from, where I started, where I am
	story: [
		'I’m Chaimel Enjambre, a web developer from Ginatilan, Cebu, with a focus on the front end. I studied Information Technology at the University of Cebu, and my first job in the field came before I graduated: an on-the-job traineeship as a software developer at SystemsCore Inc. in 2018.',
		'In 2019 I tested apps at Spingine Corporation, where I picked up practical QA habits. In 2021 I joined Proweaver as a front-end WordPress developer, building custom WordPress websites with HTML, CSS, and JavaScript — all told, I’ve shipped more than 100 WordPress sites. Since October 2022 I’ve been a web developer at Glophics, working on both sides of the stack: Nuxt.js on the front end and Laravel on the back end.',
		'My goal is to keep growing into a full-stack web developer who delivers project requirements on time and with quality. I’m comfortable working with clear direction, learning new tools, and turning designs and website updates into dependable production work.',
	],
	// the career objective from the résumé, in one line
	goal: 'Grow into a full-stack web developer who delivers on time and with quality.',
	approach: {
		title: 'How I work',
	},
	ai: {
		title: 'AI-assisted, human-reviewed',
		text: 'I use Claude and GPT to explore solutions, then review, test, and refine the code before it ships.',
	},
}

const roles: Role[] = [
	{
		start: 'Oct 2022',
		end: null,
		title: 'Web Developer',
		org: 'Glophics',
		summary: 'Builds and maintains websites and web apps across the stack — Nuxt.js front ends and Laravel back ends.',
		tags: ['Nuxt.js', 'Vue', 'Laravel', 'PHP'],
	},
	{
		start: 'Feb 2021',
		end: 'Sep 2022',
		title: 'Front-End WordPress Developer',
		org: 'Proweaver',
		summary: 'Created custom WordPress websites using HTML, CSS, JavaScript, and theme workflows.',
		tags: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript'],
	},
	{
		start: 'Jun 2019',
		end: 'Oct 2019',
		title: 'App Tester',
		org: 'Spingine Corporation',
		summary: 'Tested applications, found bugs, and learned practical QA habits for software delivery.',
		tags: ['Testing', 'QA'],
	},
	{
		start: 'Jun 2018',
		end: 'Feb 2019',
		title: 'IT Trainee (Software Developer)',
		org: 'SystemsCore Inc.',
		summary: 'My first role: an on-the-job software development traineeship, in an IT and computer technology environment.',
		tags: ['Software development'],
	},
]

const experience = {
	title: 'Web development across Nuxt.js, Laravel, WordPress, and testing.',
	education_title: 'Education & training',
}

const credentials: Credential[] = [
	{ icon: 'light-graduation-cap', title: 'BS Information Technology', place: 'University of Cebu', years: '2015 — 2019' },
	{ icon: 'light-award', title: 'Beehive Entrepreneurship Program', place: 'Online course (MOOC)', years: '2019' },
	{ icon: 'light-award', title: 'ICT Congress', place: 'Seminar', years: '2016 · 2017 · 2018' },
]

const toolGroups: ToolGroup[] = [
	{
		icon: 'light-code',
		title: 'Front-end',
		text: 'Markup, styling, and interactivity, from page structure to ship-ready UI.',
		tools: ['Nuxt', 'Vue 3', 'TypeScript', 'JavaScript', 'HTML', 'CSS & SCSS', 'Pinia', 'Bootstrap', 'Responsive design'],
	},
	{
		icon: 'light-database',
		title: 'Back-end & CMS',
		text: 'Laravel back ends at Glophics, and custom WordPress themes before that.',
		tools: ['Laravel', 'PHP', 'REST APIs', 'WordPress', 'Theme development', 'Android / Java'],
	},
	{
		icon: 'light-sparkles',
		title: 'AI-assisted workflow',
		text: 'Using AI to move faster while keeping the decisions, code review, testing, and final quality in my hands.',
		tools: ['Claude & GPT', 'Code review', 'Testing', 'Accessibility', 'Git', 'Documentation'],
	},
]

const toolkit = {
	title: 'Practical tools for building, updating, and improving websites.',
}

const contactCta = {
	title: 'Let’s work together.',
	lede: 'Clear, responsive, and dependable — from a WordPress site to a booking app.',
	text: 'I’m open to web developer roles and freelance work. Email is the fastest way to reach me — usually a reply within a day.',
}

export {
	hero,
	work,
	about,
	approachPoints,
	experience,
	roles,
	credentials,
	toolkit,
	toolGroups,
	contactCta,
}
