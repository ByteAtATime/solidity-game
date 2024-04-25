<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import BotProfile from "$lib/components/BotProfile.svelte";
  import CodeForm from "../CodeForm.svelte";

  const { next }: { next: () => void } = $props();

  let currentIndex = $state(0);

  const VALUE_REGEX = $derived(
    new RegExp(
      `^function\\s+sendToBot\\s*\\(\\s*\\)\\s+(payable\\s+external|external\\s+payable)$`,
    ),
  );
</script>

<Dialogue
  dialogue={[
    "We can finally start programming. Let’s try sending some ether to [BOT 101] and see how it reacts.",
    `First, let's add the function signature. Create a new payable function, "sendToBot", and mark it as "external'.`,
  ]}
  name="System"
  class="absolute bottom-4 left-4"
  bind:currentIndex
/>

<BotProfile />

{#if currentIndex >= 1}
  <CodeForm
    matchPattern={VALUE_REGEX}
    hints={[
      "Did you remember to mark it as <code>external</code> and <code>payable</code>?",
      "There should be no <code>return</code> statement in this function.",
    ]}
    answer="function sendToBot() external payable"
    onsubmit={next}
  >
    {#snippet children(input)}{`contract GoodBot {
  address public evilBot = 0x…;

  `}{@render input()}{` {

  }
}`}{/snippet}
  </CodeForm>
{/if}
