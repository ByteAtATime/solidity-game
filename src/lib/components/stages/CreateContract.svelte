<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import CodeInput from "$lib/components/CodeInput.svelte";
  import CodeForm from "../CodeForm.svelte";

  const { next }: { next: () => void } = $props();

  let value = $state("");

  const VALUE_REGEX = /^contract\s+GoodBot(\s*\/)?$/;
</script>

<!-- TODO: how can we make this transitino smoother? -->
<Dialogue
  dialogue={[`Let's start by creating a contract. Name it "GoodBot".`]}
  name="System"
  class="absolute bottom-4 left-4"
/>

<CodeForm
  onsubmit={next}
  matchPattern={VALUE_REGEX}
  hints={[
    `Are you sure you named it "GoodBot"?`,
    `A contract is declared using <code>contract [name]</code>.`,
  ]}
  answer="contract GoodBot"
>
  {#snippet children(input)}
    {@render input()}{` {

}`}
  {/snippet}
</CodeForm>
