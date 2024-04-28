<script>
  import { getGameState } from "$lib/state.svelte";

  const gameState = $derived.by(getGameState);
</script>

<div>
  <input type="checkbox" id="faucet-modal" class="modal-toggle" />
  <label for="faucet-modal" class="modal cursor-pointer">
    <label class="modal-box relative max-h-96 bg-base-200">
      <input class="absolute left-0 top-0 h-0 w-0" />

      <div class="flex flex-col gap-y-6">
        {#each gameState.dialogueHistory as history}
          {#if history.type === "dialogue"}
            <div class="flex w-full items-center gap-x-2">
              <div class="aspect-square w-16 flex-shrink-0 rounded-full bg-gray-800"></div>

              <div>
                <p class="text-sm font-bold uppercase tracking-wide">{history.name}</p>
                <p>{history.text}</p>
              </div>
            </div>
          {:else if history.type === "choice"}
            <div class="flex w-full items-baseline gap-x-2 py-4">
              <p class="w-16 text-sm font-bold uppercase tracking-wide">Choice</p>

              <div class="flex flex-col gap-y-2">
                {#each history.choices as possibleChoice, i}
                  <p class="font-bold text-gray-500" class:!text-choice={i === history.choice}>
                    {possibleChoice}
                  </p>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </label>
  </label>
</div>
