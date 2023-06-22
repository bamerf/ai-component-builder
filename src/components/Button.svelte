<script lang="ts">
	import clsx from 'clsx';
	export let paddingX;
	export let paddingY;
	export let backgroundColor;
	export let textColor;
	export let borderRadius;
	export let text;
	export let isBold;
</script>

<button
	style="padding-left: {$paddingX}px; padding-right: {$paddingX}px; padding-top: {$paddingY}px; padding-bottom: {$paddingY}px; background-color: {$backgroundColor}; color: {$textColor}; border-radius: {$borderRadius}px; font-weight: {$isBold
		? '600'
		: '400'};"
	class={clsx(
		'text-white',
		'font-semibold',
		'hover:bg-zinc-600/80',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 focus:ring-offset-zinc-900'
	)}>{$text}</button
>
