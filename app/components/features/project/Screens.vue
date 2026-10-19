<template>
	<section class="screens" aria-labelledby="screens-title">
		<div class="wrapper">
			<div class="screens__con">
				<MSectionHead
					eyebrow="Screens"
					title="On a desktop and on a phone."
					title-id="screens-title"
					inverse
				/>

				<div class="screens__grid">
					<div class="screens__desktop">
						<MBrowserShot
							v-for="screen in desktop_screens"
							:key="screen.image.src"
							v-reveal
							:image="screen.image"
							:url="screen.url"
							tone="dark"
						>
							{{ screen.caption }}
						</MBrowserShot>
					</div>

					<div class="screens__phones">
						<MPhoneShot
							v-for="(screen, index) in mobile_screens"
							:key="screen.image.src"
							v-reveal="index * 120"
							:image="screen.image"
							class="screens__phone"
						>
							{{ screen.caption }}
						</MPhoneShot>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import MPhoneShot from '~/components/core/project/MPhoneShot.vue'
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import type { CaseStudy } from '~/types/features/project'

interface Props {
	study: CaseStudy
}

const props = defineProps<Props>()

const desktop_screens = computed(() => props.study.screens.filter(screen => screen.device === 'desktop'))
const mobile_screens = computed(() => props.study.screens.filter(screen => screen.device === 'mobile'))
</script>

<style lang="scss" scoped>
.screens {
	background: var(--ink);
	color: var(--white);

	&__con {
		padding: 112px 0;
	}

	&__grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		align-items: center;
		gap: 56px;
		padding-top: 56px;
	}

	&__desktop {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	&__phones {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
	}

	// phone captions sit on ink too
	&__phone :deep(.m-phone-shot__caption) {
		color: var(--on-dark-subtle);
	}
}

@media only screen and (max-width: 1024px) {
	.screens {
		&__con {
			padding: 88px 0;
		}

		&__grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 48px;
			padding-top: 40px;
		}

		// width: 100% matters — with auto margins a grid item shrinks to
		// its content, and the container-sized phones have none
		&__phones {
			width: 100%;
			max-width: 520px;
			margin: 0 auto;
		}
	}
}

@media only screen and (max-width: 600px) {
	.screens {
		&__con {
			padding: 64px 0;
		}

		&__phones {
			gap: 16px;
		}
	}
}
</style>
