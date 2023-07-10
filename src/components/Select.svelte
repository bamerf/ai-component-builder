<script lang="ts">
	export let options: (
		| 'React'
		| 'Vue'
		| 'Svelte'
		| 'tsx'
		| 'jsx'
		| 'tailwindcss'
		| 'inline-css'
		| 'styles-components'
	)[] = [];
	export let value = '';

	function handleChange(event: Event) {
		const selectedValue = (event.target as HTMLSelectElement).value;
		value = selectedValue;
	}
</script>

<select class="w-full" {value} on:change={handleChange}>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
