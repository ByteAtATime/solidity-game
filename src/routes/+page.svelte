<script lang="ts">
  import AddAddress from "$lib/components/stages/AddAddress.svelte";
  import CreateContract from "$lib/components/stages/CreateContract.svelte";
  import Init from "$lib/components/stages/Init.svelte";
  import SendEtherSignature from "$lib/components/stages/SendEtherSignature.svelte";
  import { getGameState, Stage, nextStage } from "$lib/state.svelte";

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
  {/if}
</div>
