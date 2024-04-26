<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import CodeForm from "../CodeForm.svelte";

  const { next }: { next: () => void } = $props();

  const matchPatterns = { contract: /^contract\s+GoodBot(\s*\/)?$/ };
</script>

<!-- TODO: how can we make this transitino smoother? -->
<Dialogue
  dialogue={[`Let's start by creating a contract. Name it "GoodBot".`]}
  name="System"
  class="absolute bottom-4 left-4"
/>

<CodeForm
  onsubmit={next}
  {matchPatterns}
  hints={[
    `Are you sure you named it "GoodBot"?`,
    `A contract is declared using <code>contract [name]</code>.`,
  ]}
  answers={{ contract: "contract GoodBot" }}
>
  {#snippet children(input)}
    {@render input("contract")}{` {

}`}
  {/snippet}
</CodeForm>
