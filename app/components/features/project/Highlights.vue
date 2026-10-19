<template>
	<section class="highlights" aria-labelledby="highlights-title">
		<div class="wrapper">
			<div class="highlights__con">
				<MSectionHead
					:eyebrow="props.study.highlights.eyebrow"
					:title="props.study.highlights.title"
					title-id="highlights-title"
					:lede="props.study.highlights.lede"
					layout="split"
				/>

				<ul class="highlights__grid">
					<li v-for="(item, index) in props.study.highlights.items" :key="item.title" v-reveal="(index % 3) * 80" class="highlights__item">
						<span class="highlights__icon" aria-hidden="true">
							<MIcon :name="item.icon" size="md" />
						</span>
						<MHeading variant="3" size="5" class="highlights__title">{{ item.title }}</MHeading>
						<MText color="--text-secondary" class="highlights__text">{{ item.text }}</MText>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import type { CaseStudy } from '~/types/features/project'

interface Props {
	study: CaseStudy
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.highlights {
	border-top: var(--rule);
	background: var(--white);

	&__con {
		padding: 112px 0;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
		padding-top: 56px;
	}

	&__item {
		padding: 28px;
		border: var(--rule);
		border-radius: var(--radius-lg);
		background: var(--canvas);
		transition:
			border-color 0.25s var(--ease),
			transform 0.3s var(--ease);

		&:hover {
			border-color: var(--border-strong);
			transform: translateY(-3px);
		}
	}

	&__icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		background: var(--brand-soft);
		color: var(--brand-strong);
	}

	&__title {
		padding-top: 20px;
	}

	&__text {
		padding-top: 6px;
	}
}

@media only screen and (max-width: 1024px) {
	.highlights {
		&__con {
			padding: 88px 0;
		}

		&__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			padding-top: 40px;
		}
	}
}

@media only screen and (max-width: 600px) {
	.highlights {
		&__con {
			padding: 64px 0;
		}

		&__grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 12px;
		}

		&__item {
			padding: 24px;
		}
	}
}
</style>
