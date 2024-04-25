<script lang="ts">
  import AddAddress from "$lib/components/stages/AddAddress.svelte";
  import CreateContract from "$lib/components/stages/CreateContract.svelte";
  import Init from "$lib/components/stages/Init.svelte";
  import SendEtherSignature from "$lib/components/stages/SendEtherSignature.svelte";

  enum Step {
    INIT,
    CREATE_CONTRACT,
    ADD_ADDRESS,
    SEND_ETHER_SIGNATURE,
    SEND_ETHER_BODY,
  }

  let step = $state(Step.INIT);
</script>

<div class="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-y-8">
  {#if step === Step.INIT}
    <Init next={() => (step = Step.CREATE_CONTRACT)} />
  {:else if step === Step.CREATE_CONTRACT}
    <CreateContract next={() => (step = Step.ADD_ADDRESS)} />
  {:else if step === Step.ADD_ADDRESS}
    <AddAddress next={() => (step = Step.SEND_ETHER_SIGNATURE)} />
  {:else if step === Step.SEND_ETHER_SIGNATURE}
    <SendEtherSignature next={() => (step = Step.SEND_ETHER_BODY)} />
  {/if}
</div>
