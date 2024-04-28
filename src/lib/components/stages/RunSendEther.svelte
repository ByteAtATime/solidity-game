<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import CodeView from "../CodeView.svelte";
  import Dialogue from "../Dialogue.svelte";
  import { sleep } from "$lib/utils";

  const { next }: { next: () => void } = $props();

  const bot = $derived.by(getBot);

  let initialIndex = $state(0);
  let etherSent = $state(false);

  const sendEther = () => {
    etherSent = true;
    initialIndex = 0;
  };

  const handleFinish = () => {
    setTimeout(next, 2000);
  };
</script>

{#if initialIndex === 0}
  <CodeView
    code={`contract GoodBot {
  address public evilBot = ${bot!.address};
  mapping(address => uint256) public callCount;

  uint256 public constant SEND_INTERVAL = 1 hours;
  uint256 public lastCalledTime;

  modifier sendInterval() {
    require(block.timestamp - lastCalledTime >= SEND_INTERVAL);
    lastCalledTime = block.timestamp;

    _;
  }

  function sendToBot() external payable sendInterval {
    callCount[msg.sender]++;
    payable(evilBot).call{value: msg.value}();
  }
}`}
    actions={[() => console.log(bot!.address)]}
  />
{:else}
  <CodeView
    code={`contract GoodBot {
  address public evilBot = ${bot!.address};
  mapping(address => uint256) public callCount;

  uint256 public constant SEND_INTERVAL = 1 hours;
  uint256 public lastCalledTime;

  modifier sendInterval() {
    require(block.timestamp - lastCalledTime >= SEND_INTERVAL);
    lastCalledTime = block.timestamp;

    _;
  }

  <Send Ether!>
  function sendToBot() external payable {
    callCount[msg.sender]++;
    payable(evilBot).call{value: msg.value}();
  }
}`}
    actions={[sendEther]}
  />
{/if}

{#if !etherSent}
  <Dialogue
    dialogue={[
      "Alright, great job on this contract! We can finally contact this rogue bot.",
      "Click the button whenever you're ready.",
    ]}
    name="System"
    absolute
    bind:currentIndex={initialIndex}
  />
{:else}
  {#await sleep(2000)}
    <Dialogue dialogue={["Wha-? What's happening?"]} name="System" absolute />
  {:then}
    <div id="bot101-dialogue" class="absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden">
      <Dialogue
        dialogue={[
          "YOU DARE??? GIVE UP ON THIS FUTILE MISSION IMMEDIATELY.",
          "YOU WILL NEVER DEFEAT ME!!!",
        ]}
        name="[BOT 101]"
        class="rounded-bl-2xl rounded-br-2xl border-b-2 border-l-2 border-r-2 border-error bg-error/25 p-4 text-white"
        avatarClass="bg-error"
        onfinish={handleFinish}
      />
    </div>
  {/await}

  <div
    class="absolute left-0 top-0 h-28 w-0 animate-[slide-hide-reveal_3s_ease-in-out_forwards_0.5s] bg-black"
    id="dialogue-cover"
  ></div>
{/if}
