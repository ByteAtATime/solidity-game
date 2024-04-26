<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import AddressBook from "../AddressBook.svelte";
  import CodeForm from "../CodeForm.svelte";
  import Dialogue from "../Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  let currentIndex = $state(0);

  const bot = $derived.by(getBot);

  const VALUE_REGEX = $derived(
    new RegExp(`^address\\s+public\\s+evilBot\\s*=\\s*${bot?.address}\\s*;`),
  );
</script>

<Dialogue
  dialogue={[
    "Great job!",
    "Next, we need to be able to reference the bot in our contract.",
    "I have added an address book in the bottom right corner of your screen.",
    "This is where I will place important addresses in the future. You can copy the bot's address from here.",
    `Please create a field in the contract to store the bot's address named "evilBot", and make it public.`,
  ]}
  name="System"
  class="absolute bottom-4 left-4"
  bind:currentIndex
/>

{#if currentIndex >= 2}
  <AddressBook profiles={[{address: bot!.address, name: "[BOT 101]"}]} />
{/if}

{#if currentIndex >= 4}
  <CodeForm
    onsubmit={next}
    matchPattern={VALUE_REGEX}
    hints={[
      "Did you copy the correct address? The bot’s profile is at the bottom right corner of your screen.",
      "Make sure your variable is public!",
      "Did you forget a semicolon at the end of your line? ;)",
    ]}
    answer={`address public evilBot = ${bot?.address};`}
  >
    {#snippet children(input)}{`contract GoodBot {
  `}{@render input()}{`
}`}{/snippet}
  </CodeForm>
{/if}
