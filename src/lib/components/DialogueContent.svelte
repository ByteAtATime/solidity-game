<script lang="ts">
  import { DIALOGUE_DELAY } from "$lib/constants";

  let {
    dialogue,
    onfinish,
    isWaiting = $bindable(false),
    currentIndex = $bindable(0),
  }: {
    dialogue: string[];
    onfinish?: (() => void) | undefined;
    isWaiting?: boolean;
    currentIndex?: number;
  } = $props();

  let currentLength = $state(0);

  $effect(() => {
    // when a new dialogue is passed, reset the component
    dialogue;

    currentIndex = 0;
    currentLength = 0;
    isWaiting = false;

    updateDialogueDisplay();
  });

  const currentText = $derived(dialogue[currentIndex]?.slice(0, currentLength));

  let timeout: number | undefined;

  const updateDialogueDisplay = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setInterval(() => {
      // if the component is waiting for the user to continue, don't update the text
      if (isWaiting) return;

      if (currentLength < dialogue[currentIndex].length) {
        // add a character to the displayed
        currentLength++;
      } else if (currentIndex >= dialogue.length - 1) {
        // we're done displaying everything, call the onfinish callback
        clearTimeout(timeout);
        onfinish?.();
        return;
      } else {
        // we're done displaying this dialogue, wait for the user to continue
        isWaiting = true;
      }
    }, DIALOGUE_DELAY);
  };

  export const advanceDialogue = () => {
    if (isWaiting) {
      // if we were waiting, we can move on now
      isWaiting = false;

      currentIndex++;
      currentLength = 0;
    } else {
      // otherwise, we're done displaying this dialogue
      currentLength = dialogue[currentIndex].length;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      advanceDialogue();
    }
  };
</script>

<svelte:window on:keydown={handleKeyDown} />

<p>{currentText}</p>
