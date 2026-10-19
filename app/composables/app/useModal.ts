import { computed, reactive } from 'vue'

// Module-scoped so every caller shares one registry of open overlays.
// While anything is open the page behind stops scrolling: a class on
// <html> sets overflow: hidden, which (unlike position: fixed on <body>)
// keeps the visitor's scroll position.
const open_modals = reactive(new Set<string>())

function syncScrollLock() {
	if (!import.meta.client) return
	document.documentElement.classList.toggle('is-scroll-locked', open_modals.size > 0)
}

export function useModal() {
	function isOpen(name: string) {
		return open_modals.has(name)
	}

	function openModal(name: string) {
		open_modals.add(name)
		syncScrollLock()
	}

	function closeModal(name: string) {
		open_modals.delete(name)
		syncScrollLock()
	}

	function toggleModal(name: string) {
		if (isOpen(name)) closeModal(name)
		else openModal(name)
	}

	function closeAll() {
		open_modals.clear()
		syncScrollLock()
	}

	return {
		isOpen,
		openModal,
		closeModal,
		toggleModal,
		closeAll,
		openCount: computed(() => open_modals.size),
	}
}
