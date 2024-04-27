<script lang="ts">
  import type { Choice } from ".";

  const {
    choices,
    onclick,
  }: {
    choices: Choice[];
    onclick?: () => void | undefined;
  } = $props();

  const clickHandler = (action: () => void) => () => {
    onclick?.();
    action();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      // if there is only one choice, trigger it on Enter
      if (choices.length === 1) choices[0].action();
    }
  };
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="flex w-1/2 max-w-xl flex-col">
  {#each choices as choice}
    <button
      class="group cursor-pointer font-bold text-choice"
      onclick={clickHandler(choice.action)}
    >
      <span class="opacity-0 group-hover:opacity-100">&#x25B6;</span>
      {choice.text}
    </button>
  {/each}
</div>
