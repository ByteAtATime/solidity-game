<script lang="ts">
  import AddAddress from "$lib/components/stages/AddAddress.svelte";
  import CallCountMapping from "$lib/components/stages/CallCountMapping.svelte";
  import CreateContract from "$lib/components/stages/CreateContract.svelte";
  import Init from "$lib/components/stages/Init.svelte";
  import RunSendEther from "$lib/components/stages/RunSendEther.svelte";
  import SendEtherBody from "$lib/components/stages/SendEtherBody.svelte";
  import SendEtherChecks from "$lib/components/stages/SendEtherChecks.svelte";
  import SendEtherSignature from "$lib/components/stages/SendEtherSignature.svelte";
  import { getGameState, Stage, nextStage, resetGame } from "$lib/state.svelte";

  const { stage, loaded } = $derived.by(getGameState);
</script>

<div class="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-y-8">
  {#if !loaded}
    <span class="loading loading-spinner loading-lg"></span>
  {:else if stage === Stage.INIT}
    <Init next={nextStage} />
  {:else if stage === Stage.CREATE_CONTRACT}
    <CreateContract next={nextStage} />
  {:else if stage === Stage.ADD_ADDRESS}
    <AddAddress next={nextStage} />
  {:else if stage === Stage.SEND_ETHER_SIGNATURE}
    <SendEtherSignature next={nextStage} />
  {:else if stage === Stage.SEND_ETHER_BODY}
    <SendEtherBody next={nextStage} />
  {:else if stage === Stage.CALL_COUNT_MAPPING}
    <CallCountMapping next={nextStage} />
  {:else if stage === Stage.SEND_ETHER_CHECKS}
    <SendEtherChecks next={nextStage} />
  {:else if stage === Stage.RUN_SEND_ETHER}
    <RunSendEther next={nextStage} />
  {:else}
    <div class="flex max-w-sm flex-col items-center text-center">
      <h1 class="text-2xl font-bold">You've reached the end!</h1>
      <p class="text-gray-500">
        Thank you for playing! We have more content planned, so stay tuned!
      </p>

      <button class="btn btn-primary mt-4" onclick={resetGame}> Play again </button>
    </div>
  {/if}
</div>
