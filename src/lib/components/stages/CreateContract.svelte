<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import CodeInput from "$lib/components/CodeInput.svelte";

  const { next }: { next: () => void } = $props();

  let value = $state("");

  const VALUE_REGEX = /^contract\s+Bot101(\s*\/)?$/;

  const matches = $derived(VALUE_REGEX.test(value));
</script>

<Dialogue dialogue={[`Let's start by creating a contract. Name it "Bot101".`]} name="System" />

<CodeInput
  bind:value
  hints={[
    `Are you sure you named it "Bot101"?`,
    `A contract is declared using <code>contract [name]</code>.`,
  ]}
  answer="contract Bot101"
>
  {#snippet children(input)}{@render input()}{` {

}`}{/snippet}
</CodeInput>

<button disabled={!matches} class="btn btn-primary btn-block" onclick={next}> Next </button>
