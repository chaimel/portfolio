<template>
	<section class="banner" aria-labelledby="project-title">
		<div class="banner__backdrop" aria-hidden="true" />

		<div class="wrapper">
			<div class="banner__con">
				<MBreadcrumbs :items="breadcrumbs" />

				<div class="banner__intro">
					<div class="banner__text">
						<MEyebrow class="banner__eyebrow">Case study · {{ kind_label }}</MEyebrow>
						<MHeading id="project-title" variant="1" class="banner__title">{{ props.project.title }}</MHeading>
						<MText size="xlarge" color="--text-secondary" class="banner__lede">{{ props.study.lede }}</MText>

						<div class="banner__actions">
							<MButton :href="props.project.live_url" target="_blank" size="lg">
								Visit the live site
								<template #suffix>
									<MIcon name="light-arrow-up-right" size="sm" />
								</template>
							</MButton>
						</div>
					</div>

					<dl class="banner__meta">
						<div v-if="props.project.role" class="banner__meta-item">
							<dt>Role</dt>
							<dd>{{ props.project.role }}</dd>
						</div>
						<div class="banner__meta-item">
							<dt>Product</dt>
							<dd>{{ props.project.category }}</dd>
						</div>
						<div class="banner__meta-item">
							<dt>Languages</dt>
							<dd>
								<ul class="banner__stack">
									<li v-for="language in props.project.languages" :key="language">
										<MTag variant="soft" size="sm">{{ language }}</MTag>
									</li>
								</ul>
							</dd>
						</div>
						<div class="banner__meta-item">
							<dt>Built with</dt>
							<dd>
								<ul class="banner__stack">
									<li v-for="tool in props.project.stack" :key="tool">
										<MTag size="sm">{{ tool }}</MTag>
									</li>
								</ul>
							</dd>
						</div>
						<div class="banner__meta-item">
							<dt>Live at</dt>
							<dd>
								<a :href="props.project.live_url" target="_blank" rel="noopener noreferrer" class="banner__live">
									{{ host }}<span class="sr-only"> (opens in a new tab)</span>
								</a>
							</dd>
						</div>
					</dl>
				</div>

				<MBrowserShot
					:image="props.project.cover ?? props.project.image"
					:url="host"
					:scroll="!props.project.cover"
					eager
					class="banner__cover"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import type { BreadcrumbItem } from '~/types/base/ui'
import type { CaseStudy, Project } from '~/types/features/project'
import { hostLabel } from '~/utils/format'

interface Props {
	project: Project
	study: CaseStudy
}

const props = defineProps<Props>()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
	{ label: 'Home', to: '/' },
	{ label: 'Work', to: '/#work' },
	{ label: props.project.title },
])

const host = computed(() => hostLabel(props.project.live_url))
const kind_label = computed(() => (props.project.kind === 'web-app' ? 'Web app' : 'Website'))
</script>

<style lang="scss" scoped>
.banner {
	position: relative;
	overflow: hidden;
	isolation: isolate;

	&__backdrop {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(44rem 30rem at 6% 0%, var(--brand-soft), transparent 70%),
			radial-gradient(34rem 26rem at 96% 8%, var(--accent-soft), transparent 70%);

		// the lower half sits on white, so the cover meets the next section cleanly
		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 34%;
			background: var(--white);
		}
	}

	&__con {
		padding: 32px 0 0;
	}

	&__intro {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
		align-items: end;
		gap: 48px 80px;
		padding: 56px 0 64px;
	}

	&__title {
		padding-top: 18px;
		font-size: clamp(42px, 5.4vw, 76px);
		line-height: 1.02;
		letter-spacing: -0.02em;
	}

	&__lede {
		max-width: 680px;
		padding-top: 22px;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 32px;
	}

	// --- Facts ------------------------------------------------
	&__meta {
		border-top: var(--rule);
	}

	&__meta-item {
		display: grid;
		grid-template-columns: 96px minmax(0, 1fr);
		align-items: baseline;
		gap: 16px;
		padding: 14px 0;
		border-bottom: var(--rule);

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--text-muted);
		}

		dd {
			font-family: var(--font-ui);
			font-size: 15px;
			font-weight: 500;
			color: var(--text-primary);
		}
	}

	&__stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	&__live {
		color: var(--brand-strong);
		text-decoration: underline;
		text-decoration-color: var(--brand-soft);
		text-underline-offset: 4px;

		&:hover {
			color: var(--brand-deep);
			text-decoration-color: currentColor;
		}
	}

	&__cover {
		position: relative;
		max-width: 1100px;
		margin: 0 auto;
	}
}

@media only screen and (max-width: 1024px) {
	.banner__intro {
		grid-template-columns: minmax(0, 1fr);
		gap: 40px;
		padding: 40px 0 48px;
	}
}

@media only screen and (max-width: 600px) {
	.banner {
		&__title {
			font-size: clamp(36px, 10vw, 44px);
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}
	}
}
</style>
