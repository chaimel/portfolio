<template>
	<section class="overview" aria-label="Overview">
		<div class="wrapper">
			<div class="overview__con">
				<div v-reveal class="overview__col">
					<MEyebrow>The product</MEyebrow>
					<MHeading variant="2" size="3" class="overview__title">What it does</MHeading>
					<MText
						v-for="paragraph in props.study.product"
						:key="paragraph"
						size="large"
						color="--text-secondary"
						class="overview__paragraph"
					>
						{{ paragraph }}
					</MText>
				</div>

				<div v-reveal="120" class="overview__col">
					<MEyebrow tone="accent">My role</MEyebrow>
					<MHeading variant="2" size="3" class="overview__title">What I work on</MHeading>
					<MText
						v-for="paragraph in props.study.role"
						:key="paragraph"
						size="large"
						color="--text-secondary"
						class="overview__paragraph"
					>
						{{ paragraph }}
					</MText>

					<ul class="overview__built">
						<li v-for="item in props.study.built" :key="item">
							<MIcon name="light-check" size="sm" />
							{{ item }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { CaseStudy } from '~/types/features/project'

interface Props {
	study: CaseStudy
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.overview {
	background: var(--white);

	&__con {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 80px;
		padding: 112px 0;
	}

	&__title {
		padding-top: 16px;
	}

	&__paragraph {
		padding-top: 18px;
	}

	&__built {
		display: grid;
		gap: 12px;
		margin-top: 28px;
		padding: 24px;
		border: var(--rule);
		border-radius: var(--radius-lg);
		background: var(--canvas);

		li {
			display: flex;
			align-items: flex-start;
			gap: 12px;
			font-size: 15px;
			line-height: 24px;
			color: var(--text-primary);
		}

		.m-icon {
			margin-top: 4px;
			color: var(--brand);
		}
	}
}

@media only screen and (max-width: 1024px) {
	.overview__con {
		grid-template-columns: minmax(0, 1fr);
		gap: 56px;
		padding: 88px 0;
	}
}

@media only screen and (max-width: 600px) {
	.overview__con {
		padding: 64px 0;
	}
}
</style>
