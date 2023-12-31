<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { writable, derived } from 'svelte/store';
	import { afterUpdate } from 'svelte';
	import type { Writable } from 'svelte/store';
	import clsx from 'clsx';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import github from 'svelte-highlight/styles/github-dark';

	import '../app.css';

	import ResetIcon from '../components/ResetIcon.svelte';
	import Button from '../components/Button.svelte';
	import Control from '../components/Control.svelte';
	import Toggle from '../components/Toggle.svelte';
	import Select from '../components/Select.svelte';

	const bgStyles = 'bg-neutral-900 border border-neutral-400 rounded-md';

	let originalValues = {
		paddingX: 14,
		paddingY: 8,
		backgroundColor: '#52525b',
		textColor: '#FFFFFF',
		borderRadius: 4,
		text: 'Button',
		isBold: false,
		selectedFramework: 'React',
		selectedLanguage: 'tsx',
		selectedStyling: 'tailwindcss'
	};

	let paddingX = writable(originalValues.paddingX);
	let paddingY = writable(originalValues.paddingY);
	let backgroundColor = writable(originalValues.backgroundColor);
	let textColor = writable(originalValues.textColor);
	let borderRadius = writable(originalValues.borderRadius);
	let text = writable(originalValues.text);
	let isBold = writable(originalValues.isBold);
	let selectedFramework = writable(originalValues.selectedFramework);
	let initialInput = writable('');
	let selectedLanguage = writable(originalValues.selectedLanguage);
	let selectedStyling = writable(originalValues.selectedStyling);

	let combinedValues = derived(
		[
			paddingX,
			paddingY,
			backgroundColor,
			textColor,
			borderRadius,
			text,
			isBold,
			selectedFramework,
			selectedLanguage,
			selectedStyling
		],
		([
			$paddingX,
			$paddingY,
			$backgroundColor,
			$textColor,
			$borderRadius,
			$text,
			$isBold,
			$selectedFramework,
			$selectedLanguage,
			$selectedStyling
		]) => {
			return {
				paddingX: $paddingX,
				paddingY: $paddingY,
				backgroundColor: $backgroundColor,
				textColor: $textColor,
				borderRadius: $borderRadius,
				text: $text,
				fontWeight: $isBold ? '600' : '400',
				selectedFramework: $selectedFramework,
				selectedLanguage: $selectedLanguage,
				selectedStyling: $selectedStyling
			};
		}
	);

	combinedValues.subscribe((values) => {
		initialInput.set(`write me a functional button component in ${values.selectedFramework}. 
			
			these are the requirements:
			
			write it using ${values.selectedLanguage}.
			style it with ${values.selectedStyling}.
			it takes no props, and has the following styles:
			paddingX: ${values.paddingX} in pixels
			paddingY: ${values.paddingY} in pixels
			backgroundColor: ${values.backgroundColor} in hex
			textColor: ${values.textColor} in hex
			borderRadius: ${values.borderRadius} in pixels
			button text: ${values.text}
			font-weight: ${values.fontWeight}
			generate only the code. do not generate other texts or explanations and avoid using markdown language tagging or back ticks
		`);
	});

	const { messages, handleSubmit, isLoading, input } = useChat({
		api: '/server'
	});

	afterUpdate(() => {
		input.set($initialInput);
	});

	function resetInput<T>(target: Writable<T>, key: keyof typeof originalValues) {
		if (key in originalValues) {
			target.update(() => originalValues[key] as T);
		}
	}
</script>

<svelte:head>
	{@html github}
</svelte:head>

<main class="flex h-screen gap-4 p-4">
	<div class={clsx('overflow-auto min-w-[300px] p-4 flex flex-col gap-6', bgStyles)}>
		<Control label="Padding Horizontal">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(paddingX, 'paddingX')} />
				<input
					class="flex-grow w-full"
					type="range"
					min={2}
					max={48}
					step={1}
					bind:value={$paddingX}
				/>
				<p class="text-white">{$paddingX}</p>
			</div>
		</Control>

		<Control label="Padding Vertical">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(paddingY, 'paddingY')} />
				<input class="w-full" type="range" min={2} max={48} step={1} bind:value={$paddingY} />
				<p class="text-white">{$paddingY}</p>
			</div>
		</Control>

		<Control label="Border Radius">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(borderRadius, 'borderRadius')} />
				<input class="w-full" type="range" min={0} max={50} step={1} bind:value={$borderRadius} />
				<p class="text-white">{$borderRadius}</p>
			</div>
		</Control>

		<Control label="Button Text">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(text, 'text')} />
				<input class="w-full" type="text" bind:value={$text} placeholder="Button" />
			</div>
		</Control>

		<Control label="Background Color">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(backgroundColor, 'backgroundColor')} />
				<input class="w-full bg-neutral-900" type="color" bind:value={$backgroundColor} />
			</div>
		</Control>

		<Control label="Text Color">
			<div class="flex items-center gap-2">
				<ResetIcon handleReset={() => resetInput(textColor, 'textColor')} />
				<input class="w-full bg-neutral-900" type="color" bind:value={$textColor} />
			</div>
		</Control>

		<Control label="Framework">
			<Select options={['React', 'Vue', 'Svelte']} bind:value={$selectedFramework} />
		</Control>

		<Control label="Language">
			<Select options={['tsx', 'jsx']} bind:value={$selectedLanguage} />
		</Control>

		<Control label="Styling">
			<Select
				options={['tailwindcss', 'inline-css', 'styles-components']}
				bind:value={$selectedStyling}
			/>
		</Control>

		<Control label="Bold">
			<Toggle isChecked={$isBold} setIsChecked={() => ($isBold = !$isBold)} />
		</Control>

		<button class="w-full p-2 text-white rounded bg-neutral-600" on:click={handleSubmit}
			>{$isLoading ? 'Loading...' : 'Generate'}</button
		>
	</div>

	<div class="flex flex-col w-full gap-4">
		<div class={clsx('h-72 w-full flex justify-center items-center', bgStyles)}>
			<Button {paddingX} {paddingY} {backgroundColor} {textColor} {borderRadius} {text} {isBold} />
		</div>
		<div class={clsx('h-full w-full overflow-auto', bgStyles)}>
			{#each $messages as message, index (message.id)}
				{#if index !== 0}
					<div class="p-4">
						<Highlight language={typescript} langtag={false} code={message.content} let:highlighted>
							<LineNumbers {highlighted} wrapLines hideBorder --padding-left={0} />
						</Highlight>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.neutral.950);
	}
</style>
