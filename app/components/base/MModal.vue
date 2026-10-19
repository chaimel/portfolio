<template>
	<ClientOnly>
		<Teleport to="body">
			<Transition name="m-modal">
				<div v-if="is_open" class="m-modal" @keydown="onKeydown">
					<div class="m-modal__backdrop" @click="onBackdrop" />

					<div
						ref="dialog"
						class="m-modal__dialog"
						role="dialog"
						aria-modal="true"
						:aria-labelledby="props.labelledby"
						:aria-label="props.labelledby ? undefined : props.label"
						tabindex="-1"
						:style="{ maxWidth: `${props.maxWidth}px` }"
					>
						<slot />
					</div>
				</div>
			</Transition>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'

// A dialog the caller fills. Open and close it by name through useModal().
// Focus moves in on open, stays inside while open (Tab wraps), and goes
// back to whatever opened it on close. Esc and the backdrop close it.
interface Props {
	name: string
	// id of the heading that names the dialog
	labelledby?: string
	// accessible name when there's no heading to point at
	label?: string
	maxWidth?: number
	closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	labelledby: undefined,
	label: undefined,
	maxWidth: 580,
	closeOnBackdrop: true,
})

const { isOpen, closeModal } = useModal()

const dialog = ref<HTMLElement | null>(null)
let return_focus: HTMLElement | null = null

const is_open = computed(() => isOpen(props.name))

watch(is_open, async (open) => {
	if (!import.meta.client) return

	if (open) {
		return_focus = document.activeElement as HTMLElement | null
		await nextTick()
		dialog.value?.focus()
		return
	}

	return_focus?.focus()
	return_focus = null
})

function onBackdrop() {
	if (props.closeOnBackdrop) closeModal(props.name)
}

const focusable_selector = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

function onKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		event.stopPropagation()
		closeModal(props.name)
		return
	}

	if (event.key !== 'Tab' || !dialog.value) return

	const focusables = [...dialog.value.querySelectorAll<HTMLElement>(focusable_selector)]
		.filter(element => element.offsetParent !== null)
	const first = focusables[0]
	const last = focusables[focusables.length - 1]
	if (!first || !last) return

	const active = document.activeElement
	if (event.shiftKey && (active === first || active === dialog.value)) {
		event.preventDefault()
		last.focus()
	}
	else if (!event.shiftKey && active === last) {
		event.preventDefault()
		first.focus()
	}
}

// A modal unmounting while open would otherwise leave the scroll lock on.
onUnmounted(() => {
	if (is_open.value) closeModal(props.name)
})
</script>
