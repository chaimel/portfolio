<template>
	<figure class="m-phone-shot">
		<div class="m-phone-shot__frame">
			<div class="m-phone-shot__screen">
				<img
					class="m-phone-shot__img"
					:src="props.image.src"
					:alt="props.decorative ? '' : props.image.alt"
					:width="props.image.width"
					:height="props.image.height"
					:loading="props.eager ? 'eager' : 'lazy'"
					decoding="async"
				>
			</div>
			<span class="m-phone-shot__island" aria-hidden="true" />
		</div>

		<figcaption v-if="$slots['default']" class="m-phone-shot__caption">
			<slot />
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
import type { ProjectImage } from '~/types/features/project'

// A phone-sized screenshot in a device frame. Everything is sized in
// container units, so the frame scales with whatever width it's given.
interface Props {
	image: ProjectImage
	eager?: boolean
	decorative?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	eager: false,
	decorative: false,
})
</script>

<style lang="scss" scoped>
.m-phone-shot {
	container-type: inline-size;
	margin: 0;

	&__frame {
		position: relative;
		padding: 3.4cqw;
		border-radius: 15cqw;
		background: var(--ink);
		box-shadow:
			inset 0 0 0 0.8cqw var(--ink-raised),
			var(--shadow-float);
	}

	&__screen {
		overflow: hidden;
		aspect-ratio: 390 / 844;
		border-radius: 11.6cqw;
		background: var(--surface-muted);
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}

	&__island {
		position: absolute;
		top: 6.4cqw;
		left: 50%;
		width: 27cqw;
		height: 7.6cqw;
		border-radius: var(--radius-full);
		background: var(--ink);
		transform: translateX(-50%);
	}

	&__caption {
		padding-top: 14px;
		font-family: var(--font-ui);
		font-size: 14px;
		line-height: 22px;
		color: var(--text-muted);
		text-align: center;
	}
}
</style>
