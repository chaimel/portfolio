<template>
	<section id="experience" class="experience" aria-labelledby="experience-title">
		<div class="wrapper">
			<div class="experience__con">
				<MSectionHead eyebrow="Experience" index="04" :title="experience.title" title-id="experience-title" layout="split">
					<MButton :href="contact.resume" target="_blank" variant="outline">
						<template #prefix>
							<MIcon name="light-file-text" size="sm" />
						</template>
						Full résumé (PDF)
					</MButton>
				</MSectionHead>

				<!-- a ledger: one row per role, newest first; hovering a row paints
					 it in that role's color -->
				<ol class="experience__ledger">
					<li
						v-for="(role, index) in roles"
						:key="`${role.org}-${role.start}`"
						v-reveal="index * 70"
						:class="['experience__role', { 'experience__role--current': !role.end }]"
					>
						<div class="experience__when">
							<span class="experience__year" aria-hidden="true">{{ startYear(role) }}</span>
							<span class="experience__dates">
								{{ roleDates(role) }}
								<MBadge v-if="!role.end" tone="success" size="sm" dot>Current</MBadge>
							</span>
						</div>

						<div class="experience__what">
							<MHeading variant="3" size="4" class="experience__title">{{ role.title }}</MHeading>
							<span class="experience__org">{{ role.org }}</span>
						</div>

						<div class="experience__summary">
							<p>{{ role.summary }}</p>
							<ul class="experience__tags" :aria-label="`${role.title}: tools`">
								<li v-for="tag in role.tags" :key="tag">{{ tag }}</li>
							</ul>
						</div>
					</li>
				</ol>

				<div class="experience__learning">
					<MHeading variant="3" size="4">{{ experience.education_title }}</MHeading>

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
import type { Role } from '~/types/features/content'
import { roleDates } from '~/utils/format'

// "Oct 2022" → "2022"
function startYear(role: Role) {
	return role.start.split(' ').at(-1)
}
</script>

<style lang="scss" scoped>
// the hovered role, painted in its color
@mixin lit {
	color: var(--white);

	&::before {
		transform: scaleY(1);
	}

	.experience__year {
		-webkit-text-stroke-color: color-mix(in srgb, var(--role-color) 50%, var(--white));
	}

	.experience__dates,
	.experience__summary p {
		color: var(--on-dark-muted);
	}

	.experience__org {
		color: color-mix(in srgb, var(--role-color) 45%, var(--white));
	}

	.experience__tags li {
		border-color: var(--on-dark-border);
		background: transparent;
		color: var(--white);
	}
}

.experience {
	border-top: var(--rule);
	background:
		radial-gradient(40rem 26rem at 100% 0%, var(--accent-soft), transparent 70%),
		linear-gradient(180deg, var(--brand-tint) 0%, var(--canvas) 100%);

	&__con {
		padding: 120px 0;
	}

	// --- Ledger -----------------------------------------------------------
	&__ledger {
		margin-top: 56px;
	}

	&__role {
		--role-color: var(--brand);

		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 4fr) minmax(0, 5fr);
		align-items: start;
		gap: 16px 40px;
		padding: 32px 28px;
		border-top: var(--rule);
		color: var(--text-primary);
		transition: color 0.35s var(--ease);

		&:last-child {
			border-bottom: var(--rule);
		}

		&:nth-child(2) {
			--role-color: var(--accent);
		}

		&:nth-child(3) {
			--role-color: var(--sun);
		}

		&:nth-child(4) {
			--role-color: var(--brand-strong);
		}

		// the role's color, wiping up from the bottom of the row
		&::before {
			content: '';
			position: absolute;
			inset: -1px 0;
			z-index: -1;
			border-radius: var(--radius-xl);
			background:
				radial-gradient(50% 140% at 100% 0%, color-mix(in srgb, var(--role-color) 55%, transparent), transparent 70%),
				color-mix(in srgb, var(--role-color) 16%, var(--ink));
			transform: scaleY(0);
			transform-origin: 50% 100%;
			transition: transform 0.5s var(--ease);
		}

		@media (hover: hover) {
			&:hover {
				@include lit;
			}
		}
	}

	&__when {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__year {
		font-family: var(--font-display);
		font-size: 76px;
		font-weight: 700;
		line-height: 0.9;
		color: transparent;
		-webkit-text-stroke: 1.5px color-mix(in srgb, var(--role-color) 70%, var(--border-strong));
		transition: -webkit-text-stroke-color 0.35s var(--ease);
	}

	// the current role's year is filled in
	&__role--current &__year {
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-stroke: 0;
	}

	&__dates {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--text-secondary);
		transition: color 0.35s var(--ease);
	}

	&__what {
		padding-top: 6px;
	}

	&__title {
		color: inherit;
	}

	&__org {
		display: block;
		padding-top: 6px;
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 600;
		color: color-mix(in srgb, var(--role-color) 75%, var(--ink));
		transition: color 0.35s var(--ease);
	}

	&__summary {
		padding-top: 8px;

		p {
			font-size: 16px;
			line-height: 26px;
			color: var(--text-secondary);
			transition: color 0.35s var(--ease);
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding-top: 14px;

		li {
			padding: 4px 10px;
			border: 1px solid transparent;
			border-radius: var(--radius-full);
			background: color-mix(in srgb, var(--role-color) 12%, var(--white));
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			color: color-mix(in srgb, var(--role-color) 75%, var(--ink));
			transition:
				background-color 0.35s var(--ease),
				border-color 0.35s var(--ease),
				color 0.35s var(--ease);
		}
	}

	// --- Education & training ---------------------------------------------
	&__learning {
		padding-top: 88px;
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

@media only screen and (max-width: 1024px) {
	.experience {
		&__con {
			padding: 88px 0;
		}

		&__ledger {
			margin-top: 40px;
		}

		&__role {
			grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		}

		&__summary {
			grid-column: 2;
		}

		&__learning {
			padding-top: 64px;
		}

		&__credentials {
			grid-template-columns: minmax(0, 1fr);
		}
	}
}

@media only screen and (max-width: 640px) {
	.experience {
		&__con {
			padding: 64px 0;
		}

		&__role {
			grid-template-columns: minmax(0, 1fr);
			gap: 10px;
			padding: 26px 4px;
		}

		&__year {
			font-size: 56px;
		}

		&__summary {
			grid-column: auto;
		}
	}
}
</style>
