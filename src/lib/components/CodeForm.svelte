<script lang="ts">
  import type { Snippet } from "svelte";
  import CodeInput from "./CodeInput.svelte";

  const {
    onsubmit,
    matchPatterns,
    hints,
    answers,
    children: childrenProp,
  }: {
    onsubmit: () => void;
    matchPatterns: Record<string, RegExp>;
    hints?: string[];
    answers?: Record<string, string>;
    children: Snippet<[input: Snippet<[key: string]>]>;
  } = $props();

  let values = $state<Record<string, string>>(
    Object.keys(matchPatterns).reduce(
      (acc, key) => {
        acc[key] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const matches = $derived(
    Object.keys(values).length === Object.keys(matchPatterns).length &&
      Object.entries(values).every(([key, value]) => matchPatterns[key].test(value.trim())),
  );
</script>

<form
  class="flex w-full flex-col gap-y-6"
  onsubmit={(e) => {
    e.preventDefault();
    onsubmit();
  }}
>
  <CodeInput bind:values {hints} {answers}>
    {#snippet children(input)}
      {@render childrenProp(input)}
    {/snippet}
  </CodeInput>

  <button disabled={!matches} class="btn btn-primary btn-block">Next</button>
</form>
