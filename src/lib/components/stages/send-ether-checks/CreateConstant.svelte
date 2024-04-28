<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import CodeForm from "$lib/components/CodeForm.svelte";
  import Dialogue from "$lib/components/Dialogue.svelte";

  const { next }: { next: () => void } = $props();

  let initialDialogue = $state(0);
  const bot = $derived.by(getBot);

  const matchPatterns = {
    constant:
      /^uint(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?\s+public\s+constant\s+SEND_INTERVAL\s*=\s*1\s+hour\s*;$/,
    lastCalledTime:
      /^uint(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?\s+public\s+lastCalledTime\s*;$/,
  };

  const answers = {
    constant: {
      content: "uint256 public constant SEND_INTERVAL = 1 hour;",
      reason:
        "We declare a constant, which can't be changed, as a uint256 (a number type). We then set it to 1 hour, which internally is represented as 3600 seconds (a raw value of 3600).",
    },
    lastCalledTime: {
      content: "uint256 public lastCalledTime;",
      reason:
        "We declare a public uint256 variable to store the last time the sendToBot function was called.",
    },
  };
</script>

<Dialogue
  dialogue={[
    "We should implement more checks in our smart contract to prevent any unauthorized transactions.",
    "First, let's add a check to make sure that we wait an hour between calling the sendToBot function.",
    "Create a new constant called SEND_INTERVAL and set it to 1 hour.",
    "Then, create another variable called lastCalledTime to store the last time the function was called.",
  ]}
  name="System"
  absolute
  bind:currentIndex={initialDialogue}
/>

{#if initialDialogue >= 3}
  <CodeForm
    {matchPatterns}
    fullCode={`contract GoodBot {
  address public evilBot = ${bot!.address};
  mapping(address => uint256) public callsByAddress;

  [constant:uint256 public constant SEND_INTERVAL = 1 hour;]
  [lastCalledTime:uint256 public lastCalledTime;]

  function sendToBot() external payable {
    callsByAddress[msg.sender]++;
    payable(evilBot).call{value: msg.value}();
  }
}`}
    {answers}
    hints={[
      "Try using the <code>hour</code> unit to represent the time interval.",
      "The type should be <code>uint256</code>, as it represents the number of seconds in an hour.",
      "A constant should be declared with the <code>constant</code> keyword.",
    ]}
    onsubmit={next}
  />
{/if}
