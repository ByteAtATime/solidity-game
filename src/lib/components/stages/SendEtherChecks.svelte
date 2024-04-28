<script lang="ts">
  import Choices from "../Choices.svelte";
  import Dialogue from "../Dialogue.svelte";
  import AddIntervalCheck from "./send-ether-checks/AddIntervalCheck.svelte";
  import CreateConstant from "./send-ether-checks/CreateConstant.svelte";

  const { next }: { next: () => void } = $props();

  enum Stage {
    INTRO,
    CHOICES,
    CREATE_CONSTANT,
    ADD_INTERVAL_CHECK,
  }

  let stage = $state(Stage.INTRO);
</script>

{#if stage === Stage.INTRO || stage === Stage.CHOICES}
  <Dialogue
    dialogue={[
      "Great work! Unfortunately, a classified source has told me that [BOT 101] may be on the offense.",
    ]}
    name="System"
    class="absolute bottom-4 left-4"
    onfinish={() => (stage = Stage.CHOICES)}
  />
  {#if stage === Stage.CHOICES}
    <Choices
      choices={[
        {
          text: "Uh-oh, what can I do?",
          action: () => (stage = Stage.CREATE_CONSTANT),
        },
      ]}
      class="absolute bottom-28 left-4"
    />
  {/if}
{:else if stage === Stage.CREATE_CONSTANT}
  <CreateConstant next={() => (stage = Stage.ADD_INTERVAL_CHECK)} />
{:else if stage === Stage.ADD_INTERVAL_CHECK}
  <AddIntervalCheck {next} />
{/if}
