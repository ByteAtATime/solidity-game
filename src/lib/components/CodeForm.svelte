<script lang="ts">
  import type { Snippet } from "svelte";
  import CodeInputs from "./CodeInputs.svelte";

  const {
    onsubmit,
    matchPatterns,
    hints,
    answers,
    fullCode,
  }: {
    onsubmit: () => void;
    matchPatterns: Record<string, RegExp>;
    hints?: string[];
    answers?: Record<string, { content: string; reason: string }>;
    fullCode: string;
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
  <CodeInputs bind:values {hints} {answers} {fullCode} />

  <button disabled={!matches} class="btn btn-primary btn-block">Next</button>
</form>
