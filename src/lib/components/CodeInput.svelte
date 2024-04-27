<script lang="ts">
  let {
    value = $bindable(""),
    onchange = () => {},
    tooltip,
    showTooltip,
  }: {
    value?: string | undefined;
    onchange?: (value: string) => void;
    tooltip?: string | undefined;
    showTooltip?: boolean | undefined;
  } = $props();
</script>

{#snippet innerInput()}
  <input
    bind:value
    oninput={(e) => onchange(e.currentTarget.value)}
    type="text"
    placeholder="Type your code here..."
    class="input input-bordered input-primary my-2 w-full border-2 font-mono"
  />
{/snippet}

{#if tooltip && showTooltip}
  <div class="tooltip tooltip-open w-full text-wrap font-sans xl:tooltip-left" data-tip={tooltip}>
    {@render innerInput()}
  </div>
{:else}
  {@render innerInput()}
{/if}
