<template>
	<section id="contact" class="contact" aria-labelledby="contact-title">
		<div class="contact__glow" aria-hidden="true" />

		<div class="wrapper">
			<div class="contact__con">
				<div class="contact__main">
					<MEyebrow tone="sun">Contact</MEyebrow>
					<MHeading id="contact-title" variant="2" color="--white" class="contact__title">
						{{ contactCta.title }}
					</MHeading>
					<MText size="large" color="--on-dark-muted" class="contact__text">{{ contactCta.text }}</MText>

					<div class="contact__actions">
						<MButton :href="`mailto:${contact.email}`" variant="inverse" size="lg">
							<template #prefix>
								<MIcon name="light-mail" size="sm" />
							</template>
							Email me
						</MButton>
						<MButton variant="inverse-outline" size="lg" @click="copyEmail">
							<template #prefix>
								<MIcon :name="copied ? 'light-check' : 'light-copy'" size="sm" />
							</template>
							{{ copied ? 'Copied' : 'Copy email address' }}
						</MButton>
					</div>
					<span class="sr-only" role="status">{{ copied ? 'Email address copied' : '' }}</span>
				</div>

				<ul class="contact__details">
					<li v-for="detail in details" :key="detail.label">
						<component
							:is="detail.href ? 'a' : 'div'"
							:href="detail.href"
							:class="['contact__detail', { 'contact__detail--link': detail.href }]"
						>
							<span class="contact__icon" aria-hidden="true">
								<MIcon :name="detail.icon" size="md" />
							</span>
							<span class="contact__label">{{ detail.label }}</span>
							<span class="contact__value">{{ detail.value }}</span>
						</component>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { contactCta } from '~/data/features/home'
import { contact } from '~/data/features/site'
import type { MIconName } from '~/types/base/ui'

const details: { icon: MIconName, label: string, value: string, href?: string }[] = [
	{ icon: 'light-mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
	{ icon: 'light-phone', label: 'Phone', value: contact.phone, href: contact.phone_href },
	{ icon: 'light-map-pin', label: 'Location', value: contact.location },
]

const copied = ref(false)
let reset_timer: ReturnType<typeof setTimeout> | null = null

// Clipboard needs a secure context; where it's missing, open the mail app instead.
async function copyEmail() {
	try {
		await navigator.clipboard.writeText(contact.email)
		copied.value = true
		if (reset_timer) clearTimeout(reset_timer)
		reset_timer = setTimeout(() => {
			copied.value = false
		}, 2400)
	}
	catch {
		window.location.href = `mailto:${contact.email}`
	}
}

onBeforeUnmount(() => {
	if (reset_timer) clearTimeout(reset_timer)
})
</script>

<style lang="scss" scoped>
.contact {
	position: relative;
	overflow: hidden;
	isolation: isolate;
	background: var(--ink);
	color: var(--white);

	// teal and coral light in opposite corners
	&__glow {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(30rem 22rem at 100% 0%, var(--brand-glow), transparent 70%),
			radial-gradient(26rem 20rem at 0% 100%, var(--accent-glow), transparent 70%);
	}

	&__con {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		align-items: end;
		gap: 64px;
		padding: 128px 0;
	}

	&__title {
		max-width: 720px;
		padding-top: 18px;
		font-size: clamp(36px, 4.4vw, 58px);
		line-height: 1.05;
	}

	&__text {
		max-width: 560px;
		padding-top: 20px;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 36px;
	}

	// --- Details ----------------------------------------------
	&__details {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__detail {
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		grid-template-rows: auto auto;
		align-items: center;
		column-gap: 16px;
		padding: 16px 20px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-md);
		background: var(--on-dark-fill);
		transition:
			border-color 0.25s var(--ease),
			background-color 0.25s var(--ease),
			transform 0.25s var(--ease);

		&--link:hover {
			border-color: var(--sun);
			background: var(--on-dark-hover);
			transform: translateY(-2px);
		}

		&--link:focus-visible {
			outline-color: var(--sun);
		}
	}

	&__icon {
		display: grid;
		grid-row: span 2;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-sm);
		background: var(--on-dark-hover);
		color: var(--sun);
	}

	&__label {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--on-dark-subtle);
	}

	&__value {
		font-family: var(--font-ui);
		font-size: 16px;
		font-weight: 600;
		color: var(--white);
		overflow-wrap: anywhere;
	}
}

@media only screen and (max-width: 1024px) {
	.contact__con {
		grid-template-columns: minmax(0, 1fr);
		gap: 48px;
		padding: 96px 0;
	}
}

@media only screen and (max-width: 600px) {
	.contact {
		&__con {
			padding: 72px 0;
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}
	}
}
</style>
