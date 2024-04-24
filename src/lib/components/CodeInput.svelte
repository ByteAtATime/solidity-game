<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    hints = [],
    value = $bindable(""),
  }: {
    children: Snippet<[input: Snippet]>;
    hints?: string[] | undefined;
    value?: string | undefined;
  } = $props();

  let rawValue = $state(value);

  let usedHints: string[] = $state([]);

  $effect(() => {
    value = rawValue.trim();
  });
</script>

{#snippet input()}
  <input
    bind:value={rawValue}
    type="text"
    placeholder="Type your code here..."
    class="input input-bordered input-primary border-2"
  />
{/snippet}

<div class="flex w-full max-w-sm flex-col">
  <pre class="mb-4 flex justify-center"><code>{@render children(input)}</code></pre>

  {#if hints.length > usedHints.length}
    <button
      class="font-bold text-info"
      onclick={() => {
        const hint = hints[usedHints.length];
        if (hint) usedHints = [hint, ...usedHints];
      }}
    >
      {#if usedHints.length === 0}
        Stuck?
      {:else}
        Still stuck?
      {/if}
    </button>
  {/if}

  <div class="mt-2 flex flex-col gap-y-4">
    {#each usedHints as hint}
      <div class="card card-compact bg-info text-info-content">
        <div class="card-body"><p>{@html hint}</p></div>
      </div>
    {/each}
  </div>
</div>
