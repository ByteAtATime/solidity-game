<script lang="ts">
  import type { Snippet } from "svelte";
  import { ANSWER_REVEAL_DELAY } from "$lib/constants";

  let {
    children,
    hints = [],
    value = $bindable(""),
    answer,
  }: {
    children: Snippet<[input: Snippet]>;
    hints?: string[] | undefined;
    value?: string | undefined;
    answer?: string | undefined;
  } = $props();

  let rawValue = $state(value);

  let usedHints: string[] = $state([]);

  $effect(() => {
    value = rawValue.trim();
  });

  $effect(() => {
    rawValue = value;
  });

  const revealAnswer = () => {
    let currentIndex = 1;
    let interval = setInterval(() => {
      if (!answer) return;

      value = answer.slice(0, currentIndex);

      if (currentIndex === answer.length) {
        clearInterval(interval);
      } else {
        currentIndex++;
      }
    }, ANSWER_REVEAL_DELAY);
  };
</script>

{#snippet input()}
  <input
    bind:value={rawValue}
    type="text"
    placeholder="Type your code here..."
    class="input input-bordered input-primary my-2 w-full border-2"
  />
{/snippet}

<div class="flex w-full max-w-xl flex-col">
  <pre class="mb-4 flex w-full justify-center"><code class="w-full">{@render children(input)}</code
    ></pre>

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
  {:else if answer}
    <button class="font-bold text-success" onclick={revealAnswer}> Reveal answer </button>
  {/if}

  <div class="mt-2 flex flex-col gap-y-4">
    {#each usedHints as hint}
      <div class="card card-compact bg-info text-info-content">
        <div class="card-body"><p>{@html hint}</p></div>
      </div>
    {/each}
  </div>
</div>
