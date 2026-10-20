<template>
	<section id="contact" class="contact" aria-labelledby="contact-title">
		<div class="contact__glow" aria-hidden="true" />

		<div class="wrapper">
			<div class="contact__top">
				<MEyebrow tone="sun" index="05">Contact</MEyebrow>
				<span class="contact__status">
					<span class="contact__dot" aria-hidden="true" />
					{{ hero.status }}
				</span>
			</div>
		</div>

		<MHeading id="contact-title" variant="2" class="sr-only">{{ contactCta.title }}</MHeading>

		<!-- the headline as a ticker across the full width; it holds the
			 phrase twice, so sliding it by half loops seamlessly -->
		<div class="contact__ticker" aria-hidden="true">
			<div class="contact__track">
				<template v-for="copy in 2" :key="copy">
					<span v-for="n in 3" :key="`${copy}-${n}`" class="contact__phrase">
						<span :class="['contact__words', { 'contact__words--outline': n % 2 === 0 }]">{{ ticker_text }}</span>
						<MIcon name="light-sparkles" class="contact__spark" />
					</span>
				</template>
			</div>
		</div>

		<div class="wrapper">
			<div class="contact__con">
				<div class="contact__main">
					<MText size="xlarge" color="--on-dark-muted" class="contact__lede">
						{{ contactCta.lede }} {{ contactCta.text }}
					</MText>

					<!-- the email is the call to action -->
					<a :href="`mailto:${contact.email}`" class="contact__email">
						<span class="contact__email-text">{{ contact.email }}</span>
						<span class="contact__email-arrow" aria-hidden="true">
							<MIcon name="light-arrow-up-right" size="lg" />
						</span>
					</a>

					<div class="contact__pills">
						<a :href="contact.phone_href" class="contact__pill">
							<MIcon name="light-phone" size="sm" />
							{{ contact.phone }}
						</a>
						<button type="button" class="contact__pill" @click="copyEmail">
							<MIcon :name="copied ? 'light-check' : 'light-copy'" size="sm" />
							{{ copied ? 'Copied' : 'Copy email' }}
						</button>
						<a :href="contact.resume" target="_blank" rel="noopener" class="contact__pill">
							<MIcon name="light-file-text" size="sm" />
							Résumé (PDF)<span class="sr-only"> (opens in a new tab)</span>
						</a>
						<span class="sr-only" role="status">{{ copied ? 'Email address copied' : '' }}</span>
					</div>
				</div>

				<dl class="contact__card">
					<div class="contact__fact">
						<dt>Based in</dt>
						<dd>{{ contact.location }}</dd>
					</div>
					<div class="contact__fact">
						<dt>Local time</dt>
						<dd class="contact__time">{{ time || '—' }} <span>{{ localTime.place }}</span></dd>
					</div>
					<div class="contact__fact">
						<dt>Replies</dt>
						<dd>Usually within a day</dd>
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

// "Let’s work together." reads better without the full stop in a loop
const ticker_text = contactCta.title.replace(/\.$/, '')

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
	padding-top: 120px;
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

	// --- Ticker -----------------------------------------------------------
	&__ticker {
		overflow: hidden;
		padding: 48px 0 40px;
	}

	&__track {
		display: flex;
		width: max-content;
		animation: contact-slide 36s linear infinite;
	}

	&__ticker:hover &__track {
		animation-play-state: paused;
	}

	&__phrase {
		display: inline-flex;
		align-items: center;
		gap: 0.3em;
		padding-right: 0.3em;
		font-family: var(--font-display);
		font-size: clamp(72px, 11.5vw, 176px);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.03em;
		white-space: nowrap;
	}

	// every other phrase is outlined; the stroke sits under an ink fill so
	// the font's overlapping contours stay hidden
	&__words--outline {
		color: var(--ink);
		-webkit-text-stroke: 3px var(--on-dark-muted);
		paint-order: stroke fill;
	}

	&__spark {
		width: 0.42em;
		height: 0.42em;
		color: var(--sun);
	}

	// --- Email + details --------------------------------------------------
	&__con {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
		align-items: end;
		gap: 48px 72px;
		padding: 24px 0 112px;
	}

	&__lede {
		max-width: 620px;
	}

	&__email {
		display: inline-flex;
		align-items: center;
		gap: 18px;
		max-width: 100%;
		margin-top: 36px;
		padding-bottom: 10px;
		border-bottom: 2px solid var(--on-dark-border);
		font-family: var(--font-display);
		// sized to keep the whole address on one line
		font-size: clamp(19px, 5vw, 42px);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--white);
		transition:
			border-color 0.3s var(--ease),
			color 0.3s var(--ease);

		&:hover {
			border-color: var(--sun);
			color: var(--sun);
		}

		&:focus-visible {
			outline-color: var(--sun);
			outline-offset: 6px;
		}
	}

	&__email-text {
		min-width: 0;
		overflow-wrap: anywhere;
	}

	&__email-arrow {
		display: grid;
		flex: 0 0 auto;
		place-items: center;
		width: 1.3em;
		height: 1.3em;
		border-radius: 50%;
		background: var(--sun);
		color: var(--ink);
		transition: transform 0.4s var(--ease);

		.m-icon {
			width: 0.6em;
			height: 0.6em;
		}
	}

	&__email:hover &__email-arrow {
		transform: rotate(45deg);
	}

	&__pills {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding-top: 32px;
	}

	&__pill {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 52px;
		padding: 0 22px;
		border: 1px solid var(--on-dark-border);
		border-radius: var(--radius-full);
		font-family: var(--font-ui);
		font-size: 15px;
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
	}

	&__card {
		padding: 8px 28px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-xl);
		background: var(--on-dark-fill);
	}

	&__fact {
		padding: 18px 0;

		& + & {
			border-top: 1px solid var(--on-dark-rule);
		}

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
			font-family: var(--font-display);
			font-size: 19px;
			font-weight: 600;
			color: var(--white);
		}
	}

	&__time {
		font-variant-numeric: tabular-nums;

		span {
			font-family: var(--font-ui);
			font-size: 14px;
			font-weight: 500;
			color: var(--on-dark-muted);
		}
	}
}

@keyframes contact-slide {
	from {
		transform: translateX(0);
	}

	to {
		transform: translateX(-50%);
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

@media (prefers-reduced-motion: reduce) {
	.contact__track {
		animation: none;
	}
}

@media only screen and (max-width: 1024px) {
	.contact {
		padding-top: 96px;

		&__con {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
			padding-bottom: 88px;
		}
	}
}

@media only screen and (max-width: 600px) {
	.contact {
		padding-top: 72px;

		&__ticker {
			padding: 32px 0 24px;
		}

		&__words--outline {
			-webkit-text-stroke-width: 2px;
		}

		&__con {
			padding-bottom: 64px;
		}

		&__pill {
			flex: 1 1 auto;
			justify-content: center;
		}

		&__card {
			padding: 4px 22px;
		}
	}
}
</style>
