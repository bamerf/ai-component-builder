<script lang="ts">
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

<form on:submit={handleSubmit} method="post">
	<input bind:value={$input} type="text" />
	<button type="submit">Generate</button>
</form>
