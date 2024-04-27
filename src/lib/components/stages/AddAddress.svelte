<script lang="ts">
  import { getBot, getBotProfile } from "$lib/bot.svelte";
  import AddressBook from "../AddressBook.svelte";
  import CodeForm from "../CodeForm.svelte";
  import CodeView from "../CodeView.svelte";
  import Dialogue from "../Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  let currentIndex = $state(0);

  const bot = $derived.by(getBot);
  const botProfile = $derived.by(getBotProfile);

  const matchPatterns = $derived({
    declaration: new RegExp(`^address\\s+public\\s+evilBot\\s*=\\s*${bot?.address}\\s*;`),
  });
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
  <AddressBook profiles={[botProfile]} />
{/if}

{#if currentIndex < 4}
  <CodeView
    code={`
contract GoodBot {

}
`}
  />
{:else}
  <CodeForm
    onsubmit={next}
    {matchPatterns}
    hints={[
      "Did you copy the correct address? The bot’s profile is at the bottom right corner of your screen.",
      "Make sure your variable is public!",
      "Did you forget a semicolon at the end of your line? ;)",
    ]}
    answers={{
      declaration: {
        content: `address public evilBot = ${bot?.address};`,
        reason: `We make a new variable named evilBot set to the bot's addresss.`,
      },
    }}
    fullCode={`
contract GoodBot {
  [declaration: address public evilBot = ${bot?.address};]
}
`}
  />
{/if}
