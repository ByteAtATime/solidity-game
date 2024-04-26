<script lang="ts">
  import { getBotProfile } from "$lib/bot.svelte";
  import AddressBook from "../AddressBook.svelte";
  import CodeForm from "../CodeForm.svelte";
  import Dialogue from "../Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  const VALUE_REGEX =
    /payable\s*\(\s*evilBot\s*\)\s*\.\s*call\s*{\s*value:\s*msg.value\s*}\s*\(\s*\)\s*;/;

  const botProfile = $derived.by(getBotProfile);
</script>

<Dialogue
  dialogue={["Now, add a line to transfer all the ether sent with the transaction to the bot."]}
  name="System"
  class="absolute bottom-4 left-4"
/>

<CodeForm
  onsubmit={next}
  matchPattern={VALUE_REGEX}
  hints={[
    `The preferred way to send ether is by using <code>[destination].call{value: [value]}("")</code>.`,
    "Did you remember to cast the address as <code>payable</code>?",
    "Remember to send all the ether contained in the transaction! This value is accessible from <code>msg.value</code>.",
    "Did you forget a semicolon? ;)",
  ]}
  answer={`payable(evilBot).call{value: msg.value}();`}
>
  {#snippet children(input)}{`contract GoodBot {
  address public evilBot = 0x…;

  function sendToBot() external payable {
    `}{@render input()}{`
  }
}`}{/snippet}
</CodeForm>

<AddressBook profiles={[botProfile]} />
