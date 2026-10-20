<template>
	<section id="experience" class="experience" aria-labelledby="experience-title">
		<div class="wrapper">
			<div class="experience__con">
				<MSectionHead eyebrow="Experience" :title="experience.title" title-id="experience-title" layout="split">
					<MButton :href="contact.resume" target="_blank" variant="outline">
						<template #prefix>
							<MIcon name="light-file-text" size="sm" />
						</template>
						Full résumé (PDF)
					</MButton>
				</MSectionHead>

				<!-- company names set as a text logo wall -->
				<div class="experience__companies">
					<span class="experience__companies-label">{{ experience.companies_label }}</span>
					<ul class="experience__company-list">
						<li v-for="role in roles" :key="role.org" class="experience__company">{{ role.org }}</li>
					</ul>
				</div>

				<!-- a timeline: a brand-colored line, a dot per role, a card per role -->
				<ol class="experience__list">
					<li
						v-for="(role, index) in roles"
						:key="`${role.org}-${role.start}`"
						v-reveal="index * 70"
						:class="['experience__role', { 'experience__role--current': !role.end }]"
					>
						<span class="experience__dot" aria-hidden="true" />

						<div class="experience__when">
							<MText variant="span" size="small" weight="semi-bold" class="experience__dates">{{ roleDates(role) }}</MText>
							<MBadge v-if="!role.end" tone="success" size="sm" dot>Current</MBadge>
						</div>

						<div class="experience__what">
							<MHeading variant="3" size="4">{{ role.title }}</MHeading>
							<MText weight="medium" class="experience__org">{{ role.org }}</MText>
						</div>

						<div class="experience__summary">
							<MText color="--text-secondary">{{ role.summary }}</MText>
							<ul class="experience__tags" :aria-label="`${role.title}: tools`">
								<li v-for="tag in role.tags" :key="tag">{{ tag }}</li>
							</ul>
						</div>
					</li>
				</ol>

				<div class="experience__learning">
					<MHeading variant="3" size="4" class="experience__learning-title">{{ experience.education_title }}</MHeading>

					<ul class="experience__credentials">
						<li v-for="(credential, index) in credentials" :key="credential.title" v-reveal="index * 70" class="experience__credential">
							<span class="experience__credential-icon" aria-hidden="true">
								<MIcon :name="credential.icon" size="md" />
							</span>
							<div>
								<MText weight="semi-bold" color="--text-primary">{{ credential.title }}</MText>
								<MText size="small" color="--text-muted">{{ credential.place }} · {{ credential.years }}</MText>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import { credentials, experience, roles } from '~/data/features/home'
import { contact } from '~/data/features/site'
import { roleDates } from '~/utils/format'
</script>

<style lang="scss" scoped>
// cool teal fading to the canvas, with a touch of coral light
.experience {
	border-top: var(--rule);
	background:
		radial-gradient(40rem 26rem at 100% 0%, var(--accent-soft), transparent 70%),
		linear-gradient(180deg, var(--brand-tint) 0%, var(--canvas) 100%);

	&__con {
		padding: 120px 0;
	}

	// --- Where I've worked ------------------------------------
	&__companies {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px 32px;
		margin-top: 40px;
		padding: 22px 0;
		border-top: var(--rule);
		border-bottom: var(--rule);
	}

	&__companies-label {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	&__company-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 36px;
	}

	&__company {
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--text-muted);
		transition: color 0.2s var(--ease);

		&:first-child,
		&:hover {
			color: var(--brand-strong);
		}
	}

	// --- Timeline ---------------------------------------------
	&__list {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 48px;
		padding-left: 44px;

		// the line runs teal → coral → sun, top to bottom
		&::before {
			content: '';
			position: absolute;
			top: 30px;
			bottom: 30px;
			left: 11px;
			width: 2px;
			border-radius: 2px;
			background: linear-gradient(180deg, var(--brand), var(--accent), var(--sun));
		}
	}

	&__role {
		--role-color: var(--brand);

		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 4fr) minmax(0, 5fr);
		align-items: baseline;
		gap: 12px 40px;
		padding: 26px 28px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--white);
		box-shadow: var(--shadow-card);
		transition:
			border-color 0.25s var(--ease),
			transform 0.3s var(--ease);

		&:nth-child(2) {
			--role-color: var(--accent);
		}

		&:nth-child(3) {
			--role-color: var(--sun);
		}

		&:nth-child(4) {
			--role-color: var(--brand-strong);
		}

		&:hover {
			border-color: color-mix(in srgb, var(--role-color) 45%, var(--border));
			box-shadow: var(--shadow-pop);
			transform: translateX(6px);
		}

		// the role you're in now stands out
		&--current {
			border-color: color-mix(in srgb, var(--brand) 40%, var(--border));
			background: linear-gradient(100deg, var(--brand-tint) 0%, var(--white) 55%);
		}
	}

	// hovering one role dims the rest, so it reads on its own
	&__list:has(&__role:hover) &__role:not(:hover) {
		opacity: 0.5;
	}

	&__role {
		transition:
			opacity 0.3s var(--ease),
			border-color 0.25s var(--ease),
			box-shadow 0.3s var(--ease),
			transform 0.3s var(--ease);
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding-top: 12px;

		li {
			padding: 4px 10px;
			border-radius: var(--radius-full);
			background: color-mix(in srgb, var(--role-color) 12%, var(--white));
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			color: color-mix(in srgb, var(--role-color) 75%, var(--ink));
		}
	}

	&__dot {
		position: absolute;
		top: 30px;
		left: -40px;
		width: 16px;
		height: 16px;
		border: 4px solid var(--role-color);
		border-radius: 50%;
		background: var(--white);
		box-shadow: 0 0 0 4px var(--brand-tint);
	}

	// a soft pulse on the current role's dot
	&__role--current &__dot::after {
		content: '';
		position: absolute;
		inset: -8px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--brand) 30%, transparent);
		animation: experience-pulse 2s ease-out infinite;
	}

	&__when {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	&__dates {
		font-family: var(--font-ui);
		letter-spacing: 0.02em;
		color: var(--text-secondary);
	}

	&__org {
		padding-top: 4px;
		color: var(--accent-strong);
	}

	// --- Education & training ---------------------------------
	&__learning {
		padding-top: 72px;
	}

	&__credentials {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
		padding-top: 24px;
	}

	&__credential {
		--credential-color: var(--sun);

		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		align-items: center;
		gap: 16px;
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--white);
		box-shadow: var(--shadow-card);

		&:first-child {
			--credential-color: var(--brand);
		}
	}

	&__credential-icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--credential-color) 18%, var(--white));
		color: color-mix(in srgb, var(--credential-color) 80%, var(--ink));
	}
}

@keyframes experience-pulse {
	0% {
		opacity: 0.9;
		transform: scale(0.5);
	}

	100% {
		opacity: 0;
		transform: scale(1.4);
	}
}

@media only screen and (max-width: 1024px) {
	.experience {
		&__con {
			padding: 88px 0;
		}

		&__list {
			margin-top: 32px;
		}

		&__role {
			grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		}

		&__summary {
			grid-column: 2;
		}

		&__learning {
			padding-top: 56px;
		}

		&__credentials {
			grid-template-columns: minmax(0, 1fr);
		}
	}
}

@media only screen and (max-width: 600px) {
	.experience {
		&__con {
			padding: 64px 0;
		}

		&__list {
			padding-left: 32px;

			&::before {
				left: 7px;
			}
		}

		&__role {
			grid-template-columns: minmax(0, 1fr);
			gap: 8px;
			padding: 20px;
		}

		&__dot {
			left: -32px;
			top: 24px;
		}

		&__summary {
			grid-column: auto;
		}
	}
}
</style>
