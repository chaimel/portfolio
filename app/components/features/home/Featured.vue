<template>
	<section id="work" class="featured" aria-labelledby="featured-title">
		<div class="wrapper">
			<div class="featured__con">
				<div class="featured__head">
					<MEyebrow tone="sun" index="01">Featured project</MEyebrow>
					<ul class="featured__badges">
						<li class="featured__badge featured__badge--live">
							<span class="featured__dot" aria-hidden="true" />
							Live
						</li>
						<li class="featured__badge">{{ project.role }}</li>
						<li class="featured__badge">{{ project.category }}</li>
					</ul>
				</div>

				<!-- the name, set like the hero's: first word solid, the rest outlined -->
				<MHeading id="featured-title" variant="2" class="featured__title">
					<span class="featured__title-solid">{{ first_word }}</span>
					<span v-if="rest_words" class="featured__title-outline">{{ rest_words }}</span>
				</MHeading>

				<div v-reveal class="featured__stage">
					<MBrowserShot
						v-if="project.case_study"
						:image="project.case_study.flow.image"
						:url="project.case_study.flow.url"
						tone="dark"
						class="featured__browser"
					/>
					<MBrowserShot
						v-else
						:image="project.cover ?? project.image"
						:url="hostLabel(project.live_url)"
						:scroll="!project.cover"
						tone="dark"
						class="featured__browser"
					/>
					<MPhoneShot v-if="project.phone" :image="project.phone" decorative class="featured__phone" />

					<!-- callouts repeat what the text says, for sighted skimmers -->
					<span
						v-for="(callout, index) in project.callouts?.slice(0, 2)"
						:key="callout.text"
						:class="['featured__callout', index === 0 ? 'featured__callout--top' : 'featured__callout--bottom']"
						aria-hidden="true"
					>
						<MIcon :name="callout.icon" size="sm" />
						{{ callout.text }}
					</span>
				</div>

				<!-- the spec sheet: what it is, what I built, what it's built with -->
				<div class="featured__details">
					<div class="featured__intro">
						<MText size="large" color="--on-dark-muted">{{ project.summary }}</MText>
						<div class="featured__actions">
							<MButton v-if="project.case_study" :to="`/projects/${project.slug}`" variant="inverse" size="lg">
								Read the case study
								<template #suffix>
									<MIcon name="light-arrow-right" size="sm" />
								</template>
							</MButton>
							<MButton :href="project.live_url" target="_blank" variant="inverse-outline" size="lg">
								Visit the live site
								<template #suffix>
									<MIcon name="light-arrow-up-right" size="sm" />
								</template>
							</MButton>
						</div>
					</div>

					<div class="featured__built">
						<span class="featured__label">What I built</span>
						<ol class="featured__features">
							<li v-for="(feature, index) in project.features" :key="feature">
								<span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
								{{ feature }}
							</li>
						</ol>
					</div>

					<dl class="featured__spec">
						<div class="featured__spec-row">
							<dt>Languages</dt>
							<dd>
								<ul class="featured__tags">
									<li v-for="language in project.languages" :key="language">
										<MTag variant="inverse" size="sm">{{ language }}</MTag>
									</li>
								</ul>
							</dd>
						</div>
						<div class="featured__spec-row">
							<dt>Built with</dt>
							<dd>
								<ul class="featured__tags">
									<li v-for="tool in project.stack" :key="tool">
										<MTag variant="inverse" size="sm">{{ tool }}</MTag>
									</li>
								</ul>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import MPhoneShot from '~/components/core/project/MPhoneShot.vue'
import { featuredProject as project } from '~/data/features/projects'
import { hostLabel } from '~/utils/format'

const [first_word, ...rest] = project.title.split(' ')
const rest_words = rest.join(' ')
</script>

<style lang="scss" scoped>
.featured {
	position: relative;
	background: var(--ink);
	color: var(--white);

	&__con {
		padding: 120px 0 128px;
	}

	// --- Head -------------------------------------------------------------
	&__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 16px 24px;
	}

	&__badges {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	&__badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 14px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-full);
		background: var(--on-dark-fill);
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--on-dark-muted);

		&--live {
			color: var(--white);
		}
	}

	&__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--live);
	}

	// --- Title ------------------------------------------------------------
	&__title {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.22em;
		padding-top: 28px;
		font-size: clamp(52px, 9.4vw, 148px);
		line-height: 0.92;
		letter-spacing: -0.035em;
		color: var(--white);
	}

	// the stroke sits under an ink fill, so the font's overlapping
	// contours don't show through
	&__title-outline {
		color: var(--ink);
		-webkit-text-stroke: 3px var(--white);
		paint-order: stroke fill;
	}

	// --- Stage: browser + phone + callouts --------------------------------
	&__stage {
		position: relative;
		margin-top: 64px;
		padding-bottom: 40px;
	}

	&__browser {
		width: 86%;
	}

	&__phone {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 1;
		width: clamp(150px, 19%, 240px);
	}

	&__callout {
		position: absolute;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border-radius: var(--radius-full);
		background: var(--white);
		box-shadow: var(--shadow-float);
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--ink);
		white-space: nowrap;

		.m-icon {
			color: var(--brand);
		}

		&--top {
			top: 16%;
			left: -24px;
		}

		&--bottom {
			right: 14%;
			bottom: 12px;
			background: var(--sun);

			.m-icon {
				color: var(--ink);
			}
		}
	}

	// --- Spec sheet -------------------------------------------------------
	&__details {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 4fr) minmax(0, 4fr);
		gap: 40px 56px;
		margin-top: 56px;
		padding-top: 40px;
		border-top: 1px solid var(--on-dark-rule);
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 28px;
	}

	&__label,
	&__spec-row dt {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--on-dark-subtle);
	}

	&__features {
		display: grid;
		gap: 14px;
		padding-top: 16px;

		li {
			display: grid;
			grid-template-columns: 30px minmax(0, 1fr);
			gap: 8px;
			font-size: 16px;
			line-height: 24px;
			color: var(--on-dark-muted);
		}

		span {
			font-family: var(--font-display);
			font-size: 15px;
			font-weight: 700;
			color: var(--sun);
		}
	}

	&__spec {
		display: grid;
		align-content: start;
		gap: 24px;
	}

	&__spec-row dd {
		padding-top: 12px;
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
}

@media only screen and (max-width: 1024px) {
	.featured {
		&__con {
			padding: 96px 0 104px;
		}

		&__details {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}

		&__intro {
			grid-column: 1 / -1;
		}

		&__callout--top {
			left: -12px;
		}
	}
}

@media only screen and (max-width: 600px) {
	.featured {
		&__con {
			padding: 72px 0 88px;
		}

		&__title-outline {
			-webkit-text-stroke-width: 2px;
		}

		&__stage {
			margin-top: 40px;
			padding-bottom: 28px;
		}

		&__browser {
			width: 88%;
		}

		&__phone {
			width: 34%;
		}

		&__callout {
			padding: 8px 12px;
			font-size: 12px;

			&--top {
				display: none;
			}

			&--bottom {
				right: 26%;
				bottom: 0;
			}
		}

		&__details {
			grid-template-columns: minmax(0, 1fr);
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}
	}
}
</style>
