<template>
	<header :class="['header', { 'header--scrolled': is_scrolled || is_open }]">
		<a href="#main-content" class="skip-link">Skip to content</a>

		<div class="wrapper">
			<div class="header__con">
				<Logo />

				<nav class="header__nav" aria-label="Primary">
					<NuxtLink
						v-for="link in primaryNav"
						:key="link.to"
						:to="link.to"
						:class="['header__link', { 'header__link--active': isActive(link) }]"
						:aria-current="isActive(link) ? 'location' : undefined"
						@click="go($event, link)"
					>
						{{ link.label }}
					</NuxtLink>
				</nav>

				<div class="header__actions">
					<MButton :href="contact.resume" target="_blank" variant="outline" size="sm" class="header__resume">
						<template #prefix>
							<MIcon name="light-file-text" size="sm" />
						</template>
						Résumé
					</MButton>
					<MButton :to="{ path: '/', hash: '#contact' }" size="sm" class="header__cta" @click="go($event, contact_link)">
						Let’s talk
					</MButton>
					<button
						ref="toggle"
						type="button"
						class="header__toggle"
						aria-controls="mobile-nav"
						:aria-expanded="is_open"
						:aria-label="is_open ? 'Close menu' : 'Open menu'"
						@click="is_open = !is_open"
					>
						<MIcon :name="is_open ? 'light-close' : 'light-menu'" size="md" />
					</button>
				</div>
			</div>
		</div>

		<Transition name="header-panel">
			<div v-show="is_open" id="mobile-nav" class="header__panel">
				<div class="wrapper">
					<nav class="header__panel-nav" aria-label="Primary">
						<NuxtLink
							v-for="link in primaryNav"
							:key="link.to"
							:to="link.to"
							:class="['header__panel-link', { 'header__panel-link--active': isActive(link) }]"
							:aria-current="isActive(link) ? 'location' : undefined"
							@click="go($event, link)"
						>
							{{ link.label }}
							<MIcon name="light-arrow-right" size="sm" />
						</NuxtLink>
					</nav>

					<div class="header__panel-actions">
						<MButton :href="`mailto:${contact.email}`" size="lg" block>
							<template #prefix>
								<MIcon name="light-mail" size="sm" />
							</template>
							Email me
						</MButton>
						<MButton :href="contact.resume" target="_blank" variant="neutral" size="lg" block>
							<template #prefix>
								<MIcon name="light-file-text" size="sm" />
							</template>
							View résumé
						</MButton>
					</div>
				</div>
			</div>
		</Transition>

		<div v-if="is_open" class="header__backdrop" aria-hidden="true" @click="close" />
	</header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Logo from '~/components/layout/Logo.vue'
import { contact, primaryNav } from '~/data/features/site'
import type { NavLink } from '~/types/app/navigation'

const route = useRoute()
const { scrollToSection } = useSectionScroll()

const is_open = ref(false)
const is_scrolled = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)

const active_section = useActiveSection(primaryNav.flatMap(link => (link.section ? [link.section] : [])))

const contact_link: NavLink = { label: 'Contact', to: '/#contact', section: 'contact' }

// Off the home page, the case studies still belong under Work.
function isActive(link: NavLink) {
	if (route.path.startsWith('/projects/')) return link.section === 'work'
	return Boolean(link.section) && link.section === active_section.value
}

function close() {
	is_open.value = false
}

function go(event: MouseEvent, link: NavLink) {
	close()
	scrollToSection(event, link.section)
}

// Esc closes the menu and hands focus back to the toggle.
function onKeydown(event: KeyboardEvent) {
	if (event.key !== 'Escape' || !is_open.value) return
	close()
	toggle.value?.focus()
}

let frame = 0
function readScroll() {
	frame = 0
	is_scrolled.value = window.scrollY > 8
}

function onScroll() {
	if (!frame) frame = requestAnimationFrame(readScroll)
}

// Close the menu if the window widens past the mobile breakpoint.
let desktop_query: MediaQueryList | null = null
function onDesktop(event: MediaQueryListEvent) {
	if (event.matches) close()
}

watch(() => route.fullPath, close)

onMounted(() => {
	readScroll()
	window.addEventListener('scroll', onScroll, { passive: true })
	document.addEventListener('keydown', onKeydown)
	desktop_query = window.matchMedia('(min-width: 1025px)')
	desktop_query.addEventListener('change', onDesktop)
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll)
	document.removeEventListener('keydown', onKeydown)
	desktop_query?.removeEventListener('change', onDesktop)
	if (frame) cancelAnimationFrame(frame)
})
</script>

<style lang="scss" scoped>
// Open across the top of the page; once you scroll, the bar draws in
// to a floating glass pill.
.header {
	position: sticky;
	top: 0;
	z-index: 50;
	display: flex;
	align-items: center;
	height: var(--header-height);
	pointer-events: none;

	> .wrapper,
	> .skip-link {
		pointer-events: auto;
	}

	&__con {
		display: flex;
		align-items: center;
		gap: 24px;
		max-width: 100%;
		height: 56px;
		margin: 0 auto;
		padding: 0 4px;
		border: 1px solid transparent;
		border-radius: var(--radius-full);
		transition:
			max-width 0.45s var(--ease),
			padding 0.45s var(--ease),
			background-color 0.3s var(--ease),
			border-color 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	&--scrolled &__con {
		max-width: 1040px;
		padding: 0 8px 0 10px;
		border-color: var(--border);
		background: var(--header-glass);
		box-shadow: var(--shadow-float);
		backdrop-filter: saturate(1.4) blur(16px);
		-webkit-backdrop-filter: saturate(1.4) blur(16px);
	}

	// --- Nav --------------------------------------------------
	&__nav {
		display: flex;
		align-items: center;
		gap: 2px;
		margin: 0 auto;
	}

	&__link {
		padding: 8px 14px;
		border-radius: var(--radius-full);
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--text-secondary);
		white-space: nowrap;

		&:hover {
			background: var(--surface-muted);
			color: var(--text-primary);
		}

		&--active,
		&--active:hover {
			background: var(--brand-soft);
			color: var(--brand-deep);
		}
	}

	// --- Actions ----------------------------------------------
	&__actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex: 0 0 auto;
	}

	&__toggle {
		display: none;
		place-items: center;
		width: 42px;
		height: 42px;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--white);
		color: var(--text-primary);
		transition: border-color 0.2s var(--ease);

		&:hover {
			border-color: var(--border-strong);
		}
	}

	// --- Mobile panel -----------------------------------------
	&__panel {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 2;
		pointer-events: auto;
		max-height: calc(100dvh - var(--header-height));
		overflow-y: auto;
		border-bottom: var(--rule);
		background: var(--canvas);
		box-shadow: var(--shadow-float);
	}

	&__panel-nav {
		display: flex;
		flex-direction: column;
		padding-top: 8px;
	}

	&__panel-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 0;
		border-bottom: var(--rule);
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-primary);

		.m-icon {
			color: var(--text-muted);
		}

		&--active {
			color: var(--brand-strong);

			.m-icon {
				color: var(--brand);
			}
		}
	}

	&__panel-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 24px 0 28px;
	}

	// hangs off the sticky header, under the open panel
	&__backdrop {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 1;
		pointer-events: auto;
		height: calc(100dvh - var(--header-height));
		background: var(--overlay);
	}
}

// --- Panel transition -------------------------------------------
.header-panel-enter-active,
.header-panel-leave-active {
	transition:
		opacity 0.25s var(--ease),
		transform 0.25s var(--ease);
}

.header-panel-enter-from,
.header-panel-leave-to {
	opacity: 0;
	transform: translateY(-8px);
}

@media only screen and (max-width: 1024px) {
	.header {
		&__nav,
		&__resume {
			display: none;
		}

		&__actions {
			margin-left: auto;
		}

		&__toggle {
			display: inline-grid;
		}
	}
}

@media only screen and (min-width: 1025px) {
	.header__panel,
	.header__backdrop {
		display: none;
	}
}

// phones: logo + menu only (the menu panel has its own Email me)
@media only screen and (max-width: 480px) {
	.header__cta {
		display: none;
	}
}
</style>
