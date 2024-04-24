<script lang="ts">
  import CreateContract from "$lib/components/stages/CreateContract.svelte";
  import Init from "$lib/components/stages/Init.svelte";

  enum Step {
    INIT,
    CREATE_CONTRACT,
  }

  let step = $state(Step.INIT);
</script>

<div class="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-y-8">
  {#if step === Step.INIT}
    <Init next={() => (step = Step.CREATE_CONTRACT)} />
  {:else if step === Step.CREATE_CONTRACT}
    <CreateContract next={() => console.log("not yet implemented")} />
  {/if}
</div>
