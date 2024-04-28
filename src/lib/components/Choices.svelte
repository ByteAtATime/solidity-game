<script lang="ts">
  import { addDialogue, getGameState } from "$lib/state.svelte";
  import { hash } from "$lib/utils";
  import type { Choice } from ".";

  const {
    choices,
    onclick,
    class: className = "",
  }: {
    choices: Choice[];
    onclick?: () => void | undefined;
    class?: string;
  } = $props();

  const gameState = $derived.by(getGameState);

  const saveDialogue = (index: number) => {
    const id = hash("choice" + choices.join(", "));

    if (gameState.dialogueHistory.map((it) => it.id).includes(id)) {
      return;
    }

    addDialogue({
      id,
      type: "choice",
      choices: choices.map((it) => it.text),
      choice: index,
    });
  };

  const clickHandler = (index: number, action: () => void) => () => {
    onclick?.();
    action();

    saveDialogue(index);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      // if there is only one choice, trigger it on Enter
      if (choices.length === 1) {
        choices[0].action();

        saveDialogue(0);
      }
    }
  };
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="flex w-1/2 max-w-xl flex-col {className}">
  {#each choices as choice, i}
    <button
      class="group cursor-pointer font-bold text-choice"
      onclick={clickHandler(i, choice.action)}
    >
      <span class="opacity-0 group-hover:opacity-100">&#x25B6;</span>
      {choice.text}
    </button>
  {/each}
</div>
