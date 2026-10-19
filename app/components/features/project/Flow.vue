<template>
	<section class="flow" aria-labelledby="flow-title">
		<div class="wrapper">
			<div class="flow__con">
				<MSectionHead
					:eyebrow="props.study.flow.eyebrow"
					:title="props.study.flow.title"
					title-id="flow-title"
					:lede="props.study.flow.lede"
					layout="split"
				/>

				<div class="flow__body">
					<ol class="flow__steps">
						<li v-for="(step, index) in props.study.flow.steps" :key="step.title" v-reveal="index * 70" class="flow__step">
							<span class="flow__marker" aria-hidden="true">
								<MIcon :name="step.icon" size="md" />
							</span>
							<div>
								<span class="flow__number">Step {{ index + 1 }}</span>
								<MHeading variant="3" size="5" class="flow__title">{{ step.title }}</MHeading>
								<MText color="--text-secondary" class="flow__text">{{ step.text }}</MText>
							</div>
						</li>
					</ol>

					<div class="flow__visual">
						<MBrowserShot :image="props.study.flow.image" :url="props.study.flow.url" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import type { CaseStudy } from '~/types/features/project'

interface Props {
	study: CaseStudy
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.flow {
	border-top: var(--rule);
	background: var(--canvas);

	&__con {
		padding: 112px 0;
	}

	&__body {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		align-items: start;
		gap: 64px;
		padding-top: 56px;
	}

	// --- Steps, joined by a rule ------------------------------
	&__steps {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 28px;

		&::before {
			content: '';
			position: absolute;
			top: 24px;
			bottom: 24px;
			left: 23px;
			width: 2px;
			background: var(--border);
		}
	}

	&__step {
		position: relative;
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		gap: 20px;
	}

	&__marker {
		position: relative;
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border: var(--rule);
		border-radius: 50%;
		background: var(--white);
		color: var(--brand-strong);
	}

	&__step:last-child &__marker {
		border-color: var(--brand-strong);
		background: var(--brand-strong);
		color: var(--white);
	}

	&__number {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	&__title {
		padding-top: 2px;
	}

	&__text {
		padding-top: 4px;
	}

	&__visual {
		position: sticky;
		top: calc(var(--header-height) + 32px);
	}
}

@media only screen and (max-width: 1024px) {
	.flow {
		&__con {
			padding: 88px 0;
		}

		&__body {
			grid-template-columns: minmax(0, 1fr);
			gap: 48px;
			padding-top: 40px;
		}

		&__visual {
			position: static;
		}
	}
}

@media only screen and (max-width: 600px) {
	.flow__con {
		padding: 64px 0;
	}
}
</style>
