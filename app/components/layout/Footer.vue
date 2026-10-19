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

				<div class="footer__base">
					<span class="footer__note">&copy; {{ year }} {{ siteName }} · Built with Nuxt, Vue &amp; SCSS</span>
					<a href="#main-content" class="footer__top-link" @click.prevent="toTop">
						Back to top
						<MIcon name="light-arrow-up" size="sm" />
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import Logo from '~/components/layout/Logo.vue'
import { contact, primaryNav, siteName, siteRole } from '~/data/features/site'

const year = 2026

function toTop() {
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
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

	&__top-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--sun);

		.m-icon {
			transition: transform 0.25s var(--ease);
		}

		&:hover .m-icon {
			transform: translateY(-3px);
		}

		&:focus-visible {
			outline-color: var(--sun);
		}
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
		&__con {
			padding-top: 56px;
		}

		&__top {
			grid-template-columns: minmax(0, 1fr);
			gap: 36px;
		}
	}
}
</style>
