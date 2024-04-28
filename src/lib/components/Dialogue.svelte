<script lang="ts">
  import { addDialogue, getGameState } from "$lib/state.svelte";
  import { untrack } from "svelte";
  import DialogueContent from "./DialogueContent.svelte";
  import { hash } from "$lib/utils";
  import { History } from "lucide-svelte";
  import DialogueHistory from "./DialogueHistory.svelte";

  let {
    dialogue,
    onfinish,
    name,
    currentIndex = $bindable(0),
    class: className = "",
    avatarClass = "",
    absolute = false,
  }: {
    dialogue: string[];
    currentIndex?: number;
    onfinish?: (() => void) | undefined;
    name: string;
    class?: string | undefined;
    avatarClass?: string | undefined;
    absolute?: boolean | undefined;
  } = $props();

  let isWaiting = $state(false);

  let content: DialogueContent | undefined = $state();

  const gameState = $derived.by(getGameState);

  $effect(() => {
    currentIndex;

    untrack(() => {
      const id = hash("dialogue" + name + dialogue[currentIndex] + gameState.stage);

      if (gameState.dialogueHistory.map((it) => it.id).includes(id)) {
        return;
      }

      addDialogue({
        id,
        type: "dialogue",
        name,
        text: dialogue[currentIndex],
      });
    });
  });
</script>

<DialogueHistory />
<div
  class="flex w-full max-w-xl {absolute && 'absolute left-1/2 top-4 -translate-x-1/2'} {className}"
>
  <div class="flex w-full items-center gap-x-2">
    <label for="faucet-modal" class="btn btn-square btn-ghost btn-sm gap-1 font-normal">
      <History class="h-6 w-6" />
    </label>

    <div class="aspect-square w-16 flex-shrink-0 rounded-full bg-gray-800 {avatarClass}"></div>

    <div>
      <p class="text-sm font-bold uppercase tracking-wide">{name}</p>
      <DialogueContent {dialogue} {onfinish} bind:isWaiting bind:currentIndex bind:this={content} />
    </div>
  </div>

  {#if currentIndex < dialogue.length - 1}
    <button
      class="mt-2 w-24 opacity-0"
      class:opacity-100={isWaiting}
      onclick={content.advanceDialogue}>&#x25B6;<br />(<kbd class="kbd kbd-sm">Enter</kbd>)</button
    >
  {/if}
</div>
