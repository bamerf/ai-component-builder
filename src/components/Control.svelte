<script lang="ts">
	export let label: string;
	const id = crypto.randomUUID();
</script>

<div class="grid gap-1">
	<label class="text-white" for={id}>{label}</label>
	<div>
		<slot class="flex gap-2" />
	</div>
</div>
