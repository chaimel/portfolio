<template>
	<section id="experience" class="experience" aria-labelledby="experience-title">
		<div class="wrapper">
			<div class="experience__con">
				<MSectionHead eyebrow="Experience" :title="experience.title" title-id="experience-title" layout="split" inverse>
					<MButton :href="contact.resume" target="_blank" variant="inverse-outline">
						<template #prefix>
							<MIcon name="light-file-text" size="sm" />
						</template>
						Full résumé (PDF)
					</MButton>
				</MSectionHead>

				<ol class="experience__list">
					<li v-for="(role, index) in roles" :key="`${role.org}-${role.start}`" v-reveal="index * 70" class="experience__role">
						<div class="experience__when">
							<MText variant="span" size="small" weight="semi-bold" class="experience__dates">{{ roleDates(role) }}</MText>
							<MBadge v-if="!role.end" tone="inverse" size="sm" dot>Current</MBadge>
						</div>

						<div class="experience__what">
							<MHeading variant="3" size="4" color="--white">{{ role.title }}</MHeading>
							<MText weight="medium" class="experience__org">{{ role.org }}</MText>
						</div>

						<MText color="--on-dark-muted" class="experience__summary">{{ role.summary }}</MText>
					</li>
				</ol>

				<div class="experience__learning">
					<MHeading variant="3" size="4" color="--white" class="experience__learning-title">{{ experience.education_title }}</MHeading>

					<ul class="experience__credentials">
						<li v-for="(credential, index) in credentials" :key="credential.title" v-reveal="index * 70" class="experience__credential">
							<span class="experience__credential-icon" aria-hidden="true">
								<MIcon :name="credential.icon" size="md" />
							</span>
							<div>
								<MText weight="semi-bold" color="--white">{{ credential.title }}</MText>
								<MText size="small" color="--on-dark-subtle">{{ credential.place }} · {{ credential.years }}</MText>
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
// An ink band like About, lit from the other corners so the two
// sections read as separate.
.experience {
	border-top: 1px solid var(--on-dark-rule);
	background:
		radial-gradient(44rem 30rem at 100% 0%, color-mix(in srgb, var(--sun) 12%, transparent), transparent 70%),
		radial-gradient(40rem 28rem at 0% 100%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%),
		var(--ink);
	color: var(--white);

	&__con {
		padding: 120px 0;
	}

	&__list {
		padding-top: 48px;
	}

	// a résumé row: when · what · in a sentence
	&__role {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 4fr) minmax(0, 5fr);
		align-items: baseline;
		gap: 12px 40px;
		padding: 32px 0;
		border-top: 1px solid var(--on-dark-rule);
		transition: background-color 0.25s var(--ease);

		&:last-child {
			border-bottom: 1px solid var(--on-dark-rule);
		}
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
		color: var(--on-dark-muted);
	}

	&__org {
		padding-top: 4px;
		color: var(--sun);
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
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		align-items: center;
		gap: 16px;
		padding: 20px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-md);
		background: var(--on-dark-fill);
	}

	&__credential-icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--sun) 18%, transparent);
		color: var(--sun);
	}

	&__credential:first-child &__credential-icon {
		background: color-mix(in srgb, var(--brand) 28%, transparent);
		color: color-mix(in srgb, var(--brand) 45%, var(--white));
	}
}

@media only screen and (max-width: 1024px) {
	.experience {
		&__con {
			padding: 88px 0;
		}

		&__list {
			padding-top: 32px;
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

		&__role {
			grid-template-columns: minmax(0, 1fr);
			gap: 8px;
			padding: 24px 0;
		}

		&__summary {
			grid-column: auto;
		}
	}
}
</style>
