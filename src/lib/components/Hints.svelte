<script lang="ts">
  const { hints, revealAnswer = () => {} }: { hints: string[]; revealAnswer?: () => void } =
    $props();

  let usedHints = $state(0);
</script>

{#if hints.length > usedHints}
  <button class="font-bold text-info" type="button" onclick={() => usedHints++}>
    {#if usedHints === 0}
      Stuck?
    {:else}
      Still stuck?
    {/if}
  </button>
{:else if revealAnswer}
  <button class="font-bold text-success" type="button" onclick={revealAnswer}>
    Reveal answer
  </button>
{/if}

<div class="mt-2 flex flex-col gap-y-4">
  {#each Array(usedHints).keys() as hintIndex}
    {@const hint = hints[hintIndex]}

    <div class="card card-compact bg-info text-info-content">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="card-body"><p>{@html hint}</p></div>
    </div>
  {/each}
</div>
