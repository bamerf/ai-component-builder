<script lang="ts">
	import { onMount } from 'svelte';
	import clsx from 'clsx';

	export let isChecked: boolean;
	export let setIsChecked: () => void;
	let id: string;

	onMount(() => {
		id = crypto.randomUUID();
	});
</script>

<div class="flex cursor-pointer" {id} on:click={setIsChecked} on:keydown={setIsChecked}>
	<div class="relative mt-1">
		<input {id} type="checkbox" class="sr-only" checked={isChecked} />
		<div
			class={clsx('block bg-gray-400 w-9 h-5 rounded-full', {
				'bg-green-400': isChecked
			})}
		/>
		<div
			class={clsx(
				'absolute left-[3px] top-[2px] bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out',
				{ 'transform translate-x-[14px]': isChecked }
			)}
		/>
	</div>
</div>
