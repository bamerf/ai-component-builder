<script lang="ts">
	import '../app.css';
	import { useChat } from 'ai/svelte';

	const { messages, handleSubmit, input } = useChat({
		api: '/server'
	});
</script>

<ul>
	{#each $messages as message}
		<li>{message.role} says... {message.content}</li>
	{/each}
</ul>

<form class="flex justify-center items-center" on:submit={handleSubmit} method="post">
	<input bind:value={$input} type="text" />
	<button type="submit">Generate</button>
</form>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.red.500);
	}
</style>
