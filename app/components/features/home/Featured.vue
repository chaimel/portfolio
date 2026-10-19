<template>
	<section id="work" class="featured" aria-labelledby="featured-title">
		<div class="wrapper">
			<div class="featured__con">
				<div v-reveal class="featured__text">
					<MEyebrow tone="sun">Featured project</MEyebrow>
					<MHeading id="featured-title" variant="2" color="--white" class="featured__title">
						{{ project.title }}
					</MHeading>
					<MText size="large" color="--on-dark-muted" class="featured__summary">{{ project.summary }}</MText>

					<dl class="featured__meta">
						<div class="featured__meta-item">
							<dt>Role</dt>
							<dd>{{ project.role }}</dd>
						</div>
						<div class="featured__meta-item">
							<dt>Product</dt>
							<dd>{{ project.category }}</dd>
						</div>
					</dl>

					<ul class="featured__features">
						<li v-for="feature in project.features" :key="feature">
							<MIcon name="light-check" size="sm" />
							{{ feature }}
						</li>
					</ul>

					<dl class="featured__tech">
						<div class="featured__tech-row">
							<dt>Languages</dt>
							<dd>
								<ul class="featured__tags">
									<li v-for="language in project.languages" :key="language">
										<MTag variant="inverse" size="sm">{{ language }}</MTag>
									</li>
								</ul>
							</dd>
						</div>
						<div class="featured__tech-row">
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

				<div v-reveal="120" class="featured__visual">
					<MBrowserShot
						v-if="project.case_study"
						:image="project.case_study.flow.image"
						:url="project.case_study.flow.url"
						tone="dark"
					/>
					<MBrowserShot
						v-else
						:image="project.cover ?? project.image"
						:url="hostLabel(project.live_url)"
						:scroll="!project.cover"
						tone="dark"
					/>

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
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import { featuredProject as project } from '~/data/features/projects'
import { hostLabel } from '~/utils/format'
</script>

<style lang="scss" scoped>
.featured {
	position: relative;
	background: var(--ink);
	color: var(--white);

	&__con {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		align-items: center;
		gap: 72px;
		padding: 72px 0 128px;
	}

	&__title {
		padding-top: 16px;
		font-size: clamp(36px, 4vw, 52px);
		line-height: 1.05;
	}

	&__summary {
		padding-top: 18px;
	}

	// --- Role / product ---------------------------------------
	&__meta {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		margin-top: 28px;
		padding: 18px 0;
		border-top: 1px solid var(--on-dark-rule);
		border-bottom: 1px solid var(--on-dark-rule);

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--on-dark-subtle);
		}

		dd {
			padding-top: 4px;
			font-family: var(--font-display);
			font-size: 17px;
			font-weight: 600;
			color: var(--white);
		}
	}

	// --- Highlights -------------------------------------------
	&__features {
		display: grid;
		gap: 12px;
		padding-top: 24px;

		li {
			display: flex;
			align-items: flex-start;
			gap: 12px;
			font-size: 16px;
			line-height: 24px;
			color: var(--on-dark-muted);
		}

		.m-icon {
			margin-top: 4px;
			color: var(--sun);
		}
	}

	// --- Languages / tools ------------------------------------
	&__tech {
		display: grid;
		gap: 12px;
		padding-top: 28px;
	}

	&__tech-row {
		display: grid;
		grid-template-columns: 96px minmax(0, 1fr);
		align-items: center;
		gap: 16px;

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--on-dark-subtle);
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 32px;
	}

	// --- Screenshot -------------------------------------------
	&__visual {
		position: relative;
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
			top: 18%;
			left: -28px;
		}

		&--bottom {
			right: -20px;
			bottom: -22px;
			background: var(--sun);

			.m-icon {
				color: var(--ink);
			}
		}
	}
}

@media only screen and (max-width: 1024px) {
	.featured__con {
		grid-template-columns: minmax(0, 1fr);
		gap: 56px;
		padding: 56px 0 104px;
	}

	.featured__callout--top {
		left: -12px;
	}

	.featured__callout--bottom {
		right: -8px;
	}
}

@media only screen and (max-width: 600px) {
	.featured {
		&__con {
			padding: 48px 0 88px;
		}

		&__meta {
			grid-template-columns: minmax(0, 1fr);
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}

		&__callout {
			font-size: 12px;
			padding: 8px 12px;

			&--top {
				display: none;
			}

			&--bottom {
				right: 12px;
				bottom: -18px;
			}
		}
	}
}
</style>
