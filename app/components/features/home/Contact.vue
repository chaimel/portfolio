<template>
	<section id="contact" class="contact" aria-labelledby="contact-title">
		<div class="contact__glow" aria-hidden="true" />

		<div class="wrapper">
			<div class="contact__con">
				<div class="contact__top">
					<MEyebrow tone="sun">Contact</MEyebrow>
					<span class="contact__status">
						<span class="contact__dot" aria-hidden="true" />
						{{ hero.status }}
					</span>
				</div>

				<MHeading id="contact-title" variant="2" color="--white" class="contact__title">
					{{ contactCta.title }}
				</MHeading>
				<MText size="xlarge" color="--on-dark-muted" class="contact__lede">
					{{ contactCta.lede }} {{ contactCta.text }}
				</MText>

				<!-- a rule with the big round button riding on it -->
				<div class="contact__rule">
					<a :href="`mailto:${contact.email}`" class="contact__orb">
						<MIcon name="light-arrow-up-right" size="lg" />
						Get in touch
					</a>
				</div>

				<div class="contact__pills">
					<a :href="`mailto:${contact.email}`" class="contact__pill">
						<MIcon name="light-mail" size="sm" />
						{{ contact.email }}
					</a>
					<a :href="contact.phone_href" class="contact__pill">
						<MIcon name="light-phone" size="sm" />
						{{ contact.phone }}
					</a>
					<button type="button" class="contact__pill contact__pill--ghost" @click="copyEmail">
						<MIcon :name="copied ? 'light-check' : 'light-copy'" size="sm" />
						{{ copied ? 'Copied' : 'Copy email' }}
					</button>
					<span class="sr-only" role="status">{{ copied ? 'Email address copied' : '' }}</span>
				</div>

				<dl class="contact__facts">
					<div>
						<dt>Based in</dt>
						<dd>{{ contact.location }}</dd>
					</div>
					<div>
						<dt>Local time</dt>
						<dd>{{ time || '—' }} · {{ localTime.place }}</dd>
					</div>
					<div>
						<dt>Résumé</dt>
						<dd>
							<a :href="contact.resume" target="_blank" rel="noopener" class="contact__link">
								Download PDF<span class="sr-only"> (opens in a new tab)</span>
							</a>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { contactCta, hero } from '~/data/features/home'
import { contact, localTime } from '~/data/features/site'

const time = useLocalTime(localTime.timezone)

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
			radial-gradient(40rem 28rem at 100% 0%, var(--brand-glow), transparent 70%),
			radial-gradient(34rem 24rem at 0% 100%, var(--accent-glow), transparent 70%);
	}

	&__con {
		padding: 128px 0 96px;
	}

	&__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px 24px;
	}

	&__status {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 8px 14px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-full);
		background: var(--on-dark-fill);
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--on-dark-muted);
	}

	&__dot {
		position: relative;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--live);

		&::after {
			content: '';
			position: absolute;
			inset: -5px;
			border-radius: 50%;
			background: var(--live);
			opacity: 0.4;
			animation: contact-pulse 1.8s ease-out infinite;
		}
	}

	// the headline is the section
	&__title {
		padding-top: 28px;
		font-size: clamp(56px, 10vw, 152px);
		line-height: 0.95;
		letter-spacing: -0.03em;
	}

	&__lede {
		max-width: 640px;
		padding-top: 24px;
	}

	// --- Rule + round button ----------------------------------
	&__rule {
		position: relative;
		height: 1px;
		margin: 104px 0 72px;
		background: var(--on-dark-border);
	}

	&__orb {
		position: absolute;
		top: 50%;
		right: 8%;
		display: grid;
		place-items: center;
		place-content: center;
		gap: 6px;
		width: 176px;
		height: 176px;
		border-radius: 50%;
		background: linear-gradient(150deg, var(--brand), var(--brand-strong));
		box-shadow: var(--shadow-float);
		font-family: var(--font-display);
		font-size: 17px;
		font-weight: 600;
		color: var(--white);
		transform: translateY(-50%);
		transition:
			background 0.3s var(--ease),
			color 0.3s var(--ease),
			transform 0.4s var(--ease);

		.m-icon {
			justify-self: center;
			transition: transform 0.4s var(--ease);
		}

		&:hover {
			background: var(--sun);
			color: var(--ink);
			transform: translateY(-50%) scale(1.06);

			.m-icon {
				transform: rotate(45deg);
			}
		}

		&:focus-visible {
			outline-color: var(--sun);
			outline-offset: 6px;
		}
	}

	// --- Pills ------------------------------------------------
	&__pills {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	&__pill {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 60px;
		padding: 0 26px;
		border: 1px solid var(--on-dark-border);
		border-radius: var(--radius-full);
		font-family: var(--font-ui);
		font-size: 17px;
		font-weight: 600;
		color: var(--white);
		transition:
			background-color 0.25s var(--ease),
			border-color 0.25s var(--ease),
			color 0.25s var(--ease);

		&:hover {
			border-color: var(--white);
			background: var(--white);
			color: var(--ink);
		}

		&:focus-visible {
			outline-color: var(--sun);
		}

		&--ghost {
			border-color: transparent;
			color: var(--on-dark-muted);

			&:hover {
				border-color: var(--on-dark-border);
				background: var(--on-dark-hover);
				color: var(--white);
			}
		}
	}

	// --- Small facts ------------------------------------------
	&__facts {
		display: flex;
		flex-wrap: wrap;
		gap: 24px 64px;
		padding-top: 56px;

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--on-dark-subtle);
		}

		dd {
			padding-top: 6px;
			font-family: var(--font-ui);
			font-size: 16px;
			font-weight: 500;
			color: var(--white);
			font-variant-numeric: tabular-nums;
		}
	}

	&__link {
		color: var(--sun);
		text-decoration: underline;
		text-underline-offset: 4px;

		&:hover {
			color: var(--white);
		}

		&:focus-visible {
			outline-color: var(--sun);
		}
	}
}

@keyframes contact-pulse {
	0% {
		opacity: 0.5;
		transform: scale(0.6);
	}

	100% {
		opacity: 0;
		transform: scale(1.6);
	}
}

@media only screen and (max-width: 1024px) {
	.contact {
		&__con {
			padding: 96px 0 72px;
		}

		&__rule {
			margin: 88px 0 64px;
		}

		&__orb {
			width: 144px;
			height: 144px;
			font-size: 15px;
		}
	}
}

@media only screen and (max-width: 600px) {
	.contact {
		&__con {
			padding: 72px 0 56px;
		}

		&__rule {
			margin: 72px 0 56px;
		}

		&__orb {
			right: 0;
			width: 120px;
			height: 120px;
			font-size: 14px;
		}

		&__pill {
			width: 100%;
			height: 54px;
			justify-content: center;
			font-size: 15px;
		}
	}
}
</style>
