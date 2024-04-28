<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import CodeForm from "$lib/components/CodeForm.svelte";
  import Dialogue from "$lib/components/Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  let dialogueIndex = $state(0);

  const bot = $derived.by(getBot);
</script>

<Dialogue
  dialogue={[
    `Great! Now, let's create a modifier called "sendInterval" that checks if the function is called within a certain interval.`,
    "We can do this by comparing the current time with the last time the function was called.",
    "Add a require statement inside the sendToBot function that checks if the difference between the current time and lastCalledTime is greater than SEND_INTERVAL.",
    "Remember to update lastCalledTime after the check to store the current time.",
  ]}
  name="System"
  absolute
  bind:currentIndex={dialogueIndex}
/>

{#if dialogueIndex >= 2}
  <CodeForm
    matchPatterns={{
      modifier: /^modifier\s*sendInterval$/,
      require:
        /^require\s*\(\s*block\.timestamp\s*-\s*lastCalledTime\s*>\s*=?\s*SEND_INTERVAL\s*\)\s*;$/,
      update: /^lastCalledTime\s*=\s*block\.timestamp\s*;$/,
      modifierInvoke: /^sendInterval$/,
    }}
    fullCode={`contract GoodBot {
  address public evilBot = ${bot!.address};
  mapping(address => uint256) public callsByAddress;

  uint256 public constant SEND_INTERVAL = 1 hour;
  uint256 public lastCalledTime;

  [modifier:modifier sendInterval] {
    [require:require(block.timestamp - lastCalledTime >= SEND_INTERVAL);]
    [update:lastCalledTime = block.timestamp;]

    _; // This executes the function
  }

  function sendToBot() external payable [modifierInvoke:sendInterval] {
    callsByAddress[msg.sender]++;
    payable(evilBot).call{value: msg.value}(msg.value);
  }
}`}
    answers={{
      modifier: {
        content: "modifier sendInterval",
        reason:
          "We define a modifier called sendInterval to check if the function is called within a certain interval.",
      },
      require: {
        content: "require(block.timestamp - lastCalledTime >= SEND_INTERVAL);",
        reason:
          "We use a require statement to check if the difference between the current time and lastCalledTime is greater than or equal to SEND_INTERVAL.",
      },
      update: {
        content: "lastCalledTime = block.timestamp;",
        reason: "We update lastCalledTime to store the current time after the check.",
      },
      modifierInvoke: {
        content: "sendInterval",
        reason:
          "We invoke the sendInterval modifier to check the interval before executing the function.",
      },
    }}
    hints={[
      "Use a <code>require</code> statement to check if the condition is met. If not, the function will revert.",
      "The <code>block.timestamp</code> variable gives you the current time in seconds.",
    ]}
    onsubmit={next}
  />
{/if}
