<script lang="ts">
  import DialogueContent from "./DialogueContent.svelte";

  let {
    dialogue,
    onfinish,
    name,
    currentIndex = $bindable(0),
    class: className = "",
  }: {
    dialogue: string[];
    currentIndex?: number;
    onfinish?: (() => void) | undefined;
    name: string;
    class?: string | undefined;
  } = $props();

  let isWaiting = $state(false);

  let content: DialogueContent | undefined = $state();
</script>

<div class="flex w-full max-w-xl {className}">
  <div class="flex w-full items-center gap-x-2">
    <div class="aspect-square w-16 flex-shrink-0 rounded-full bg-gray-800"></div>

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
