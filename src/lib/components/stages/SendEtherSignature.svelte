<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import BotProfile from "$lib/components/BotProfile.svelte";
  import CodeInput from "../CodeInput.svelte";

  const { next }: { next: () => void } = $props();

  let value = $state("");
  let currentIndex = $state(0);

  const VALUE_REGEX = $derived(
    new RegExp(
      `^function\\s+sendToBot\\s*\\(\\s*\\)\\s+(payable\\s+external|external\\s+payable)$`,
    ),
  );

  const matches = $derived(VALUE_REGEX.test(value));
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
  <CodeInput
    bind:value
    hints={[
      "Did you remember to mark it as and <code>external</code> <code>payable</code>?",
      "There should be no <code>return</code> statement in this function.",
    ]}
    answer="function sendToBot() external payable"
  >
    {#snippet children(input)}{`contract GoodBot {
  address public evilBot = 0x…;

  `}{@render input()}{` {

  }
}`}{/snippet}
  </CodeInput>

  <button disabled={!matches} class="btn btn-primary btn-block" onclick={next}> Next </button>
{/if}
