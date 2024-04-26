<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import Dialogue from "$lib/components/Dialogue.svelte";
  import AddressBook from "../AddressBook.svelte";
  import CodeForm from "../CodeForm.svelte";

  const { next }: { next: () => void } = $props();

  let currentIndex = $state(0);

  const matchPatterns = {
    signature: /^function\s+sendToBot\s*\(\s*\)\s+(payable\s+external|external\s+payable)$/,
  };

  const bot = $derived.by(getBot);
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

<AddressBook profiles={[{address: bot!.address, name: "[BOT 101]"}]} />

{#if currentIndex >= 1}
  <CodeForm
    {matchPatterns}
    hints={[
      "Did you remember to mark it as <code>external</code> and <code>payable</code>?",
      "There should be no <code>return</code> statement in this function.",
    ]}
    answers={{ signature: "function sendToBot() external payable" }}
    onsubmit={next}
  >
    {#snippet children(input)}{`contract GoodBot {
  address public evilBot = 0x…;

  `}{@render input("signature")}{` {

  }
}`}{/snippet}
  </CodeForm>
{/if}
