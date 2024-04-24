<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import Choices from "$lib/components/Choices.svelte";

  const { next }: { next: () => void } = $props();

  let showChoice = $state(false);
</script>

<Dialogue
  dialogue={[
    "Hello, anon, and welcome to the SpeedRunEthereum initiation.",
    "We have reason to believe that [BOT 101] has gone rogue. It is your mission to attempt to contact it.",
  ]}
  name="System"
  onfinish={() => (showChoice = true)}
/>

{#if showChoice}
  <Choices
    choices={[
      {
        text: "Let's do it!",
        action: next,
      },
    ]}
    triggerOnEnter
  />
{/if}
