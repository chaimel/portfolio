// Site-wide copy, contact details, and navigation.
import type { NavLink } from '~/types/app/navigation'
import type { ContactDetails } from '~/types/features/content'

const siteName = 'Chaimel Enjambre'
const siteRole = 'Web Developer'
const siteTitle = `${siteName} — ${siteRole}`
const siteDescription
	= 'Portfolio of Chaimel Enjambre, a web developer in Cebu, Philippines with a front-end focus: Nuxt, Vue, Laravel, and 100+ WordPress sites shipped.'

const contact: ContactDetails = {
	email: 'chaimelenjambre15@gmail.com',
	phone: '0927 537 2224',
	phone_href: 'tel:+639275372224',
	location: 'Ginatilan, Cebu, Philippines',
	resume: '/Chaimel-Enjambre-Resume.pdf',
}

// Every link lands on a home-page section, so they work from any page.
const primaryNav: NavLink[] = [
	{ label: 'Work', to: '/#work', section: 'work' },
	{ label: 'About', to: '/#about', section: 'about' },
	{ label: 'Experience', to: '/#experience', section: 'experience' },
	{ label: 'Skills', to: '/#skills', section: 'skills' },
	{ label: 'Contact', to: '/#contact', section: 'contact' },
]

export {
	siteName,
	siteRole,
	siteTitle,
	siteDescription,
	contact,
	primaryNav,
}
