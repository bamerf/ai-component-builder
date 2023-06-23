<script lang="ts">
	export let handleReset: () => void;
</script>

<span on:click={handleReset} on:keypress={handleReset}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="white"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="cursor-pointer hover:stroke-neutral-300 feather feather-rotate-ccw"
		><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg
	>
</span>
