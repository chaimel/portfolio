<template>
	<section id="skills" class="skills" aria-labelledby="skills-title">
		<div class="wrapper">
			<div class="skills__con">
				<MSectionHead eyebrow="Skills" :title="toolkit.title" title-id="skills-title" inverse />

				<ul class="skills__grid">
					<li v-for="(group, index) in toolGroups" :key="group.title" v-reveal="index * 90" class="skills__group">
						<span class="skills__icon" aria-hidden="true">
							<MIcon :name="group.icon" size="md" />
						</span>
						<MHeading variant="3" size="4" color="--white" class="skills__title">{{ group.title }}</MHeading>
						<MText color="--on-dark-muted" class="skills__text">{{ group.text }}</MText>

						<ul class="skills__tools" :aria-label="`${group.title} tools`">
							<li v-for="tool in group.tools" :key="tool">
								<MTag variant="inverse" size="sm">{{ tool }}</MTag>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import { toolGroups, toolkit } from '~/data/features/home'
</script>

<style lang="scss" scoped>
// An ink band with teal light from below, leading into Contact.
.skills {
	border-top: 1px solid var(--on-dark-rule);
	background:
		radial-gradient(50rem 30rem at 50% 100%, color-mix(in srgb, var(--brand) 20%, transparent), transparent 70%),
		var(--ink);
	color: var(--white);

	&__con {
		padding: 120px 0;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		padding-top: 56px;
	}

	// glass panels, each topped with one of the brand's three colors
	&__group {
		--group-color: var(--brand);

		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 32px 28px 28px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-lg);
		background:
			radial-gradient(28rem 14rem at 0% 0%, color-mix(in srgb, var(--group-color) 16%, transparent), transparent 70%),
			var(--on-dark-fill);
		transition:
			border-color 0.25s var(--ease),
			transform 0.3s var(--ease);

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 3px;
			background: var(--group-color);
		}

		&:nth-child(2) {
			--group-color: var(--accent);
		}

		&:nth-child(3) {
			--group-color: var(--sun);
		}

		&:hover {
			border-color: color-mix(in srgb, var(--group-color) 45%, transparent);
			transform: translateY(-3px);
		}
	}

	&__icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--group-color) 24%, transparent);
		color: color-mix(in srgb, var(--group-color) 60%, var(--white));
	}

	&__title {
		padding-top: 20px;
	}

	&__text {
		padding-top: 8px;
	}

	&__tools {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: auto;
		padding-top: 24px;
	}
}

@media only screen and (max-width: 1024px) {
	.skills {
		&__con {
			padding: 88px 0;
		}

		&__grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 16px;
			padding-top: 40px;
		}
	}
}

@media only screen and (max-width: 600px) {
	.skills {
		&__con {
			padding: 64px 0;
		}

		&__group {
			padding: 28px 22px 24px;
		}
	}
}
</style>
