<template>
	<footer class="footer">
		<div class="wrapper">
			<div class="footer__con">
				<div class="footer__top">
					<div class="footer__brand">
						<Logo inverse />
						<MText color="--on-dark-muted" class="footer__message">
							{{ siteRole }} in Cebu, Philippines — building fast, responsive websites and web apps with Nuxt, Vue, Laravel, and WordPress.
						</MText>
					</div>

					<nav class="footer__col" aria-label="Footer">
						<span class="footer__col-title">Explore</span>
						<ul class="footer__links">
							<li v-for="link in primaryNav" :key="link.to">
								<NuxtLink :to="link.to" class="footer__link">{{ link.label }}</NuxtLink>
							</li>
						</ul>
					</nav>

					<div class="footer__col">
						<span class="footer__col-title">Get in touch</span>
						<ul class="footer__links">
							<li>
								<a :href="`mailto:${contact.email}`" class="footer__link">{{ contact.email }}</a>
							</li>
							<li>
								<a :href="contact.phone_href" class="footer__link">{{ contact.phone }}</a>
							</li>
							<li>
								<a :href="contact.resume" target="_blank" rel="noopener" class="footer__link">
									Résumé (PDF)<span class="sr-only"> (opens in a new tab)</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<!-- the name across the full width; SVG so it always fits exactly -->
				<svg class="footer__wordmark" viewBox="0 0 1200 140" aria-hidden="true" focusable="false">
					<defs>
						<linearGradient id="footer-wordmark-fill" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0" stop-color="currentColor" stop-opacity="0.9" />
							<stop offset="1" stop-color="currentColor" stop-opacity="0.25" />
						</linearGradient>
					</defs>
					<text x="0" y="118" font-size="128" textLength="1200" lengthAdjust="spacingAndGlyphs" fill="url(#footer-wordmark-fill)">{{ siteName.toUpperCase() }}</text>
				</svg>

				<div class="footer__base">
					<span class="footer__note">&copy; {{ year }} {{ siteName }} · Built with Nuxt, Vue &amp; SCSS</span>
					<span class="footer__note">{{ localTime.place }} · {{ time || '—' }}</span>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import Logo from '~/components/layout/Logo.vue'
import { contact, localTime, primaryNav, siteName, siteRole } from '~/data/features/site'

const year = 2026
const time = useLocalTime(localTime.timezone)
</script>

<style lang="scss" scoped>
.footer {
	border-top: 1px solid var(--on-dark-rule);
	background: var(--ink);
	color: var(--white);

	&__con {
		padding: 72px 0 32px;
	}

	&__top {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1.2fr);
		gap: 48px;
		padding-bottom: 48px;
		border-bottom: 1px solid var(--on-dark-rule);
	}

	&__brand {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}

	&__message {
		max-width: 360px;
	}

	&__col {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__col-title {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--on-dark-subtle);
	}

	&__links {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__link {
		font-family: var(--font-ui);
		font-size: 15px;
		color: var(--on-dark-muted);
		overflow-wrap: anywhere;

		&:hover {
			color: var(--white);
			text-decoration: underline;
			text-underline-offset: 4px;
		}

		&:focus-visible {
			outline-color: var(--sun);
		}
	}

	// the gradient runs from teal-white to a faint fade
	&__wordmark {
		display: block;
		width: 100%;
		height: auto;
		margin-top: 56px;
		color: color-mix(in srgb, var(--brand) 55%, var(--white));
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	&__base {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 16px;
		padding-top: 24px;
	}

	&__note {
		font-family: var(--font-ui);
		font-size: 13px;
		line-height: 20px;
		color: var(--on-dark-subtle);
	}
}

@media only screen and (max-width: 1024px) {
	.footer__top {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	}

	.footer__brand {
		grid-column: 1 / -1;
	}
}

@media only screen and (max-width: 600px) {
	.footer {
		// room under the last line for the floating back-to-top button
		&__con {
			padding: 56px 0 80px;
		}

		&__top {
			grid-template-columns: minmax(0, 1fr);
			gap: 36px;
		}
	}
}
</style>
