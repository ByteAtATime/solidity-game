<script lang="ts" context="module">
  let inputIndex = $state(0);
</script>

<script lang="ts">
  inputIndex++;

  let {
    value = $bindable(""),
    answerLength = Infinity,
    onchange = () => {},
    tooltip,
    showTooltip,
  }: {
    value?: string | undefined;
    answerLength?: number | undefined;
    onchange?: (value: string) => void;
    tooltip?: string | undefined;
    showTooltip?: boolean | undefined;
  } = $props();

  const width = $derived(answerLength < 20 ? "w-auto" : "w-full");

  const tooltipPosition = $derived(
    inputIndex % 2 === 0 ? "tooltip-top xl:tooltip-left" : "tooltip-bottom xl:tooltip-right",
  );
</script>

{#snippet innerInput()}
  <input
    bind:value
    oninput={(e) => onchange(e.currentTarget.value)}
    type="text"
    placeholder="Type your code here..."
    class="input input-bordered input-primary my-2 border-2 font-mono {width}"
  />
{/snippet}

{#if tooltip && showTooltip}
  <div
    class="tooltip tooltip-open {width} text-wrap font-sans {tooltipPosition}"
    data-tip={tooltip}
  >
    {@render innerInput()}
  </div>
{:else}
  {@render innerInput()}
{/if}
