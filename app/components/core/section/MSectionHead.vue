<template>
	<div :class="['m-section-head', `m-section-head--${props.layout}`, { 'm-section-head--inverse': props.inverse }]">
		<div class="m-section-head__main">
			<MEyebrow v-if="props.eyebrow" :tone="props.inverse ? 'sun' : 'brand'">{{ props.eyebrow }}</MEyebrow>
			<MHeading
				:id="props.titleId"
				:variant="props.level"
				size="2"
				:color="props.inverse ? '--white' : undefined"
				class="m-section-head__title"
			>
				{{ props.title }}
			</MHeading>
		</div>

		<div v-if="props.lede || $slots['default']" class="m-section-head__side">
			<MText
				v-if="props.lede"
				size="large"
				:color="props.inverse ? '--on-dark-muted' : '--text-secondary'"
				class="m-section-head__lede"
			>
				{{ props.lede }}
			</MText>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
// Eyebrow, heading, and lede for a page section. `split` puts the lede
// (and any slotted actions) beside the heading on wide screens.
interface Props {
	title: string
	// the heading's id, for the section's aria-labelledby
	titleId?: string
	eyebrow?: string
	lede?: string
	level?: '1' | '2' | '3'
	layout?: 'stack' | 'split'
	// on ink bands
	inverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	titleId: undefined,
	eyebrow: undefined,
	lede: undefined,
	level: '2',
	layout: 'stack',
	inverse: false,
})
</script>

<style lang="scss" scoped>
.m-section-head {
	&__title {
		max-width: 760px;
		padding-top: 16px;
	}

	&__lede {
		max-width: 620px;
	}

	&--stack {
		.m-section-head__side {
			padding-top: 20px;
		}
	}

	&--split {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		align-items: end;
		gap: 24px 64px;

		.m-section-head__side {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}
	}
}

@media only screen and (max-width: 1024px) {
	.m-section-head--split {
		grid-template-columns: minmax(0, 1fr);
	}
}
</style>
