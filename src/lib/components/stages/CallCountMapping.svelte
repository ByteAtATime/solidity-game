<script lang="ts">
  import { getBot, getBotProfile } from "$lib/bot.svelte";
  import AddressBook from "../AddressBook.svelte";
  import CodeForm from "../CodeForm.svelte";
  import Dialogue from "../Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  let currentIndex = $state(0);

  const matchPatterns = {
    declaration:
      /mapping\s*\(\s*address\s*=>\s*uint(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?\)\s+public\s+callsByAddress\s*;/,
    increment: /callsByAddress\s*\[\s*msg\s*.\s*sender\s*\]\s*\+\+\s*;/,
  };

  const bot = $derived.by(getBot);
  const botProfile = $derived.by(getBotProfile);
</script>

<Dialogue
  dialogue={[
    "Amazing! I am so glad you decided to join our side.",
    "To track the number of times this has been called by each address, can you please create a mapping named “callsByAddress”?",
    "Increment this mapping every time the “sendToBot” function is called. Remember to mark it as public, so we can read from it.",
  ]}
  name="System"
  class="absolute bottom-4 left-4"
  bind:currentIndex
/>

{#if currentIndex >= 2}
  <CodeForm
    onsubmit={next}
    {matchPatterns}
    hints={[
      "The type should be <code>mapping(address => uint256)</code>, as it tracks the number of times (a <code>uint256</code>) each address (a, well, <code>address</code>) calls it.",
      "Remember to increment the number corresponding to the address that sent the transaction, which is accessible from <code>msg.sender</code>.",
    ]}
    answers={{
      declaration: "mapping(address => uint256) public callsByAddress;",
      increment: "callsByAddress[msg.sender]++;",
    }}
  >
    {#snippet children(
      input,
    )}{`contract GoodBot {
  address public evilBot = 0x${bot!.address};
  `}{@render input(
        "declaration",
      )}{`

  function sendToBot() external payable {
    `}{@render input("increment")}{`
    payable(evilBot).send(msg.value);
  }
}`}{/snippet}
  </CodeForm>
{/if}

<AddressBook profiles={[botProfile]} />
