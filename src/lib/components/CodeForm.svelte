<script lang="ts">
  import type { Snippet } from "svelte";
  import CodeInput from "./CodeInput.svelte";

  const {
    onsubmit,
    matchPattern,
    hints,
    answer,
    children: childrenProp,
  }: {
    onsubmit: () => void;
    matchPattern: RegExp;
    hints?: string[];
    answer?: string;
    children: Snippet<[Snippet]>;
  } = $props();

  let value = $state("");

  const matches = $derived(matchPattern.test(value));
</script>

<form>
  <CodeInput bind:value {hints} {answer}>
    {#snippet children(input)}
      {@render childrenProp(input)}
    {/snippet}
  </CodeInput>

  <button disabled={!matches} class="btn btn-primary btn-block" onclick={onsubmit}> Next </button>
</form>
