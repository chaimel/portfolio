<template>
	<section class="cta" aria-labelledby="cta-title">
		<div class="wrapper">
			<div class="cta__con">
				<div>
					<MEyebrow>What’s next</MEyebrow>
					<MHeading id="cta-title" variant="2" class="cta__title">Need a front end like this one?</MHeading>
					<MText size="large" color="--text-secondary" class="cta__text">
						I’m open to web developer roles and freelance work. Tell me about the project — I usually reply within a day.
					</MText>
				</div>

				<div class="cta__actions">
					<MButton :href="`mailto:${contact.email}`" size="lg">
						<template #prefix>
							<MIcon name="light-mail" size="sm" />
						</template>
						Email me
					</MButton>
					<MButton to="/#work" variant="neutral" size="lg">
						See more work
						<template #suffix>
							<MIcon name="light-arrow-right" size="sm" />
						</template>
					</MButton>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { contact } from '~/data/features/site'
</script>

<style lang="scss" scoped>
.cta {
	background: var(--canvas);

	&__con {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 32px 64px;
		padding: 104px 0;
	}

	&__title {
		max-width: 640px;
		padding-top: 16px;
	}

	&__text {
		max-width: 560px;
		padding-top: 16px;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
}

@media only screen and (max-width: 600px) {
	.cta {
		&__con {
			padding: 64px 0;
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}
	}
}
</style>
