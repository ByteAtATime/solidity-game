<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import BotProfile from "../BotProfile.svelte";
  import CodeInput from "../CodeInput.svelte";
  import Dialogue from "../Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  let value = $state("");
  let currentIndex = $state(0);

  const bot = $derived.by(getBot);

  const VALUE_REGEX = $derived(
    new RegExp(`^address\\s+public\\s+evilBot\\s*=\\s*${bot?.address}\\s*;`),
  );

  $inspect(VALUE_REGEX);

  const matches = $derived(VALUE_REGEX.test(value));
</script>

<Dialogue
  dialogue={[
    "Great job!",
    "Next, we need to be able to reference the bot in our contract.",
    "I have added a profile for the bot in the bottom right corner of your screen.",
    `Please create a field in the contract to store the bot's address named "evilBot", and make it public.`,
  ]}
  name="System"
  class="absolute bottom-4 left-4"
  bind:currentIndex
/>

{#if currentIndex >= 2}
  <BotProfile />
{/if}

{#if currentIndex >= 3}
  <CodeInput
    bind:value
    hints={[
      "Did you copy the correct address? The bot’s profile is at the bottom right corner of your screen.",
      "Make sure your variable is public!",
      "Did you forget a semicolon at the end of your line? ;)",
    ]}
    answer={`address public evilBot = ${bot?.address};`}
  >
    {#snippet children(input)}{`contract Bot101 {
  `}{@render input()}{`
}`}{/snippet}
  </CodeInput>

  <button disabled={!matches} class="btn btn-primary btn-block" onclick={next}> Next </button>
{/if}
